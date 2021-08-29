let {Client, Message, MessageEmbed} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let embed = new MessageEmbed();
    embed.setDescription('Thanks for your idea to invite me, '+msg.author.tag+'.\n[Click here](https://discord.com/api/oauth2/authorize?client_id=803387328294027264&permissions=3525697&scope=bot) to invite me');
    await msg.reply({embeds: [embed]});
};