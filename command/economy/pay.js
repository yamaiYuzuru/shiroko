let {Client, Message, MessageEmbed} = require('discord.js');
let {economySchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if (!member) return msg.reply(`Can't find this member`);
    if (!args[1]) return msg.reply('You must enter an amount of creditpoints you will give to **' + member.user.tag + '**');
    let user1 = await economySchema.findOne({userID: msg.author.id});
    let user2 = await economySchema.findOne({userID: member.user.id});

    if (!user1 || !user2) return false;

    if (args[1] > user1.creditpoint) return msg.reply('You don\'t have enough creditpoints');

    user1.creditpoint -= Math.round(args[1]-0);
    user2.creditpoint += Math.round(args[1]-0);
    await user1.save();
    await user2.save();

    let embed = new MessageEmbed();
    embed.setTitle('Pay');
    embed.setDescription(`You had successful ${Math.floor(args[1]-0)} creditpoints to ${member.user.tag}`);
    await msg.reply({embeds: [embed]})
};

exports.info = {
    description: "Give some Creditpoints to an user",
    usage: "s$pay <@user/userID> <amount>",
    aliases: ['give']
};