let {Client, Message, MessageEmbed} = require('discord.js');
let {economySchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let user = await economySchema.findOne({userID: msg.author.id});

    let inventory = user.items;

    let embed = new MessageEmbed();
    embed.setTitle(`${msg.author.username}'s inventory`);
    embed.setDescription(inventory.join('\n'));
    await msg.reply({embeds: [embed]})
};

exports.info = {
    description: "Shows your inventory"
};