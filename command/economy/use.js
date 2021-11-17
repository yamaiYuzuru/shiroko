let {Client, Message, MessageEmbed} = require('discord.js');
let {levelSchema, economySchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let ecoUser = await economySchema.findOne({userID: msg.author.id});
    let levelUser = await levelSchema.findOne({userID: msg.author.id});

    if (!ecoUser.items.includes(args[0])) return msg.reply('You don\'t own this level rank card background');

    levelUser.background = args[0];
    await levelUser.save();
    await msg.reply(`You had set ${args[0]} as your level rank card background`)
};