let {Client, Message, MessageEmbed} = require('discord.js');
let {economySchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let user = await economySchema.findOne({userID: msg.author.id});
    let items = user.items;
    let embed = new MessageEmbed();
    embed.setTitle('Shop - Level card');
    embed.setDescription(`**Default**: ${items.includes('ba0') ? 'Bought' : "0<:creditpoint:745337132184240342>"}\n**Blue Archive 1**: ${items.includes('ba1') ? 'Bought' : '5000<:creditpoint:745337132184240342>'}\n**Blue Archive 2**: ${items.includes('ba2') ? 'Bought':"10000<:creditpoint:745337132184240342>"}\n**Blue Archive 3**: ${items.includes('ba3') ? "Bought" : "15000<:creditpoint:745337132184240342>"}\n**Blue Archive 4**: ${items.includes('ba4') ? 'Bought' : '20000<:creditpoint:745337132184240342>'}`);
    await msg.reply({embeds: [embed]})
};

exports.info = {
    description: "The Shop"
};