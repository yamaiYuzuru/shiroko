let {Client, Message, MessageEmbed} = require('discord.js');
let {economySchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let member = msg.member || msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    let user = await economySchema.findOne({userID: member.user.id});
    if (!user) return false;

    let embed = new MessageEmbed();
    embed.setTitle('Creditpoints');
    embed.setAuthor(member.user.tag, member.user.avatarURL({dynamic: true}));
    embed.addField('Creditpoints', `${user.creditpoint}<:creditpoint:745337132184240342>`);
    embed.addField('Daily streak', `${user.dailyStreak || null}`);
    await msg.reply({embeds: [embed]});
};

exports.info = {
    description: "Shows your or from an user the creditpoints",
    usage: "s$creditpoints [@user/userID]",
    aliases: ['money', 'cp']
};