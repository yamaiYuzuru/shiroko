let {Client, Message, MessageEmbed} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let embed = new MessageEmbed();
    embed.setDescription('Thanks for your idea to vote for me.\n[Top.gg](https://top.gg/bot/803387328294027264/vote)\n[D-BL.eu](https://discord-botlist.eu/vote/803387328294027264)\n[BBL.xyz](https://bladebotlist.xyz/bot/803387328294027264/vote)\n[DBL.com](https://discord.ly/shiroko/upvote)');
    await msg.reply({embeds: [embed]});
};