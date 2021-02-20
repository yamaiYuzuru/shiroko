'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const snek = require('snekfetch');
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg) => {
        snek.get('https://waifu.pics/api/sfw/waifu').end((err, res) => {
            if (err) return console.error(err);
            let embed = new MessageEmbed();
            embed.setTitle('Your random waifu');
            embed.setImage(res.body.url);
            embed.setURL(res.body.url);
            embed.setFooter(`Random waifu requested by ${msg.author.tag}`, msg.author.avatarURL());
            embed.setTimestamp(Date.now());
            msg.channel.send(embed);
        });
    },
    info: {
        description: "Get an random waifu"
    }
};