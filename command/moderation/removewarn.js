let {Client, Message, MessageEmbed} = require('discord.js');
let {moderationSchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let embed = new MessageEmbed();
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    if (!msg.member.permissions.has('KICK_MEMBERS')) return msg.reply('You don\'t have enough permissions to use this command');
    if (!member) return msg.reply('I can\'t find this member');

    let user = await moderationSchema.findOne({userID: member.user.id});

    if (!args[1]) return msg.reply('You must enter an number or all to clear warns');

    let amount;
    if (args[1] === "all") {
        amount = user.warnings.length;
        embed.setDescription(`All warns was removed from ${member.user.tag}`);
    } else {
        amount = args[1]-1;
        embed.setDescription(`${amount} warns was removed from ${member.user.tag}`);
    }

    user.warnings.pull(amount);
    await user.save();

    embed.setTitle('Warn Remove');
    await msg.reply({embeds: [embed]});
};

exports.info = {
    description: "Remove a warn or remove all warns from an user",
    usage: "s$warnremove <@user/userID> <amount/all>"
};
