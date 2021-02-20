'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
let puppy = require('random-puppy');
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg) => {
        await puppy('memes').then(url => {
            let embed = new MessageEmbed();
            embed.setTitle('Meeeeeems');
            embed.setURL(url)
            embed.setTimestamp(Date.now());
            embed.setImage(url);
            embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed);
        });
    },
    info: {
        description: "Get some memes"
    }
};
