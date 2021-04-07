'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const fs = require('fs');
// const db = JSON.parse(fs.readFileSync('./db/shiroko.json', "utf8"));
let config = require('./../config.json');
module.exports = async (client, msg) => {
    const prefix = "sb$";
    
    if (!msg.guild) return msg.channel.send('Sorry but you can\'t use commands only in guilds.');

    if (msg.content === `<@!${client.user.id}>`) return msg.channel.send('My prefix is `s$`');

    if (!msg.content.startsWith(prefix)) return true;

    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLocaleLowerCase();
    const cmd = client.cmds.get(command) || client.aliases.get(command);

    if (!cmd) return msg.channel.send('Here is something wrong. I can\'t find this command.').then(() => {
        setTimeout(() => {
            msg.channel.bulkDelete(2);
        }, 4000);
    });

    if (cmd.kategorie === "nsfw" && !msg.channel.nsfw) {
        return msg.channel.send(new MessageEmbed().setDescription("Nsfw commands works only in NSFW marked channels!"));
    }
    if (cmd.kategorie === "admin" && config.admins.includes(msg.author.id)) {
        return true;
    }

     await cmd.run(client, msg, args);
};