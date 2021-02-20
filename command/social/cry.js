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
        const sadReplies = ["cries", "is sad"];
        await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} ${sadReplies[Math.floor(Math.random() * sadReplies.length)]}`).setImage(gif.getCry));
    },
    info: {
        description: "Say if you sad and want to cry"
    }
};