let {Client, Message, MessageEmbed} = require('discord.js');
let {moderationSchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    let user = await moderationSchema.findOne({userID: member.user.id});

    if (!user.warnings.length) {
        await msg.reply('This user doesn\'t have any warns')
    }

    const data = [];

    for (let i = 0; user.warnings.length > i; i++) {
        data.push(`**Warning:** ${i + 1}`);
        data.push(`**Reason:** ${user.warnings[i]}`);
        data.push(`**Moderator:** ${await client.users.fetch(user.moderator[i]).catch(() => 'Deleted User')}`);
        data.push(`**Date:** ${new Date(user.date[i]).toLocaleDateString()}`);
    }

    const embed = {
        thumbnail: {
            url: member.user.displayAvatarURL({ dynamic: true })
        },
        description: data.join('\n')
    };

    await msg.reply({embeds: [embed]})
};

exports.info = {
    description: "View all warns of an member"
}