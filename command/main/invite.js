'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg) => {
        await msg.channel.send(new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL()).setDescription(`Oh! Thank you, ${msg.author.tag} for your idea to add me on your server. \n[Click here](https://discord.com/api/oauth2/authorize?client_id=803387328294027264&permissions=3525697&scope=bot) to invite me`).setTimestamp(Date.now()));
    },
    info: {
        description: "Invite Shiroko to your server"
    }
};