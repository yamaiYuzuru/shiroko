let {Client, Message} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    switch (args[0]) {
        case "ba0":
            await msg.reply('https://cdn.discordapp.com/attachments/872424813065564190/884561290327121950/rank-card.png');
            break;
        case "ba1":
            await msg.reply('https://cdn.discordapp.com/attachments/872424813065564190/884562106836484096/rank-card.png')
            break;
        case "ba2":
            await msg.reply('https://cdn.discordapp.com/attachments/872424813065564190/884562262365450290/rank-card.png')
            break;
        case "ba3":
            await msg.reply('https://cdn.discordapp.com/attachments/872424813065564190/884674691397214228/rank-card.png')
            break;
        case "ba4":
            await msg.reply('https://cdn.discordapp.com/attachments/872424813065564190/884674894367969341/rank-card.png')
            break;
        default:
            await msg.reply('Preview Example: ba0, ba1, ba2, ba3, ba4');
            break;
    }
};

exports.info = {
    description: "Get a preview of an rank card background"
};