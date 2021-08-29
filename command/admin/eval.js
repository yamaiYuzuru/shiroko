let {Client, Message} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    try {
        await msg.reply(eval(args.join(' ')));
    } catch (e) {
        await msg.reply(e.toString());
    }
};

exports.info = {
    description: "Evaluate some JS Codes",
    usage: "s$eval <code>"
};