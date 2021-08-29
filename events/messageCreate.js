let {Client, Message} = require('discord.js');
let {userSchema, economySchema, shirokoSchema} = require('../models');

/**
 * @param {Client} client
 * @param {Message} msg
 */
module.exports = async (client, msg) => {
    if (msg.author.bot) return false;

    let user = await userSchema.findOne({userID: msg.author.id});
    let economyUser = await economySchema.findOne({userID: msg.author.id});
    let clientUser = await shirokoSchema.findOne({clientID: client.user.id});
    if (!user) {
       let newUser = await userSchema.create({
           userID: msg.author.id,
           joinedTimestamp: Math.floor(new Date().getTime()/1000.0)
       });
       await newUser.save();
    }
    if (!economyUser) {
        let newUser = await economySchema.create({
            userID: msg.author.id,
            lastDaily: null
        });

        await newUser.save();
    }

    const prefixes = user.prefixes;
    const prefix = prefixes.find(p => msg.content.startsWith(p.toLocaleLowerCase()));
    if (!prefix) return false;

    if (clientUser.botBannedUsers.includes(msg.author.id)) return msg.reply('Sorry you was banned from shiroko');
    
    let args = msg.content.slice(prefix.length).trim().split(' ');
    let command = args.shift().toLocaleLowerCase();
    let cmd = client.commands.get(command) || client.aliases.get(command);

    if (!cmd) return msg.reply("I can't find this command.\nPlease check if you have written the command right");

    if (cmd.info.category === "nsfw" && !msg.channel.nsfw) return msg.reply('This comamnd works only in nsfw channels');
    if (cmd.info.category === "admin" && !client.config.admins.includes(msg.author.id)) return msg.reply('You must be an admin of me to use this command');

    await cmd.run(client, msg, args);
    clientUser.usedCommands++;
    await clientUser.save();
};