'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
let Gif = require('../../function/gif');
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg) => {
        let gif = new Gif();
        const replies = ["is happy", "smiles"];
        await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} ${replies[Math.floor(Math.random() * replies.length)]}`).setImage(gif.getHappy));
    },
    info: {
        description: "Say if you happy"
    },
    aliases: ["smile"]
};