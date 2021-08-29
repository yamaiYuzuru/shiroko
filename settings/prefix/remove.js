let {Client, Message} = require('discord.js');
let {userSchema} = require('../../models');
/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.execute = async (client, msg, args) => {
    let user = await userSchema.findOne({userID: msg.author.id});
    if (!args[1]) return msg.reply('You must enter a prefix');
    delete user.prefixes.pull(args[1]);
    await user.save();
    await msg.reply(`${args[1]} was successful removed`);
};