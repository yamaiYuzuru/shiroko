'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const fetch = require('node-superfetch');

module.exports = {
    run: async (client, msg) => {
        fetch.get(`https://www.reddit.com/r/animemes/.json`).end((err, res) => {
            if (err) console.error(err);
            const allowed = msg.channel.nsfw ? res.body.data.children : res.body.data.children.filter(post => !post.data.over_18);
            if (!allowed.length) return msg.channel.send('It seems we are out of memes');
            const randomnumber = Math.floor(Math.random() * allowed.length);
            const embed = new MessageEmbed()
                .setColor(0x00A2E8)
                .setTitle(allowed[randomnumber].data.title)
                .setImage(allowed[randomnumber].data.url)
                .setTimestamp(Date.now())
                .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
            msg.channel.send(embed)
        });
    },
    info: {
        description: "Get some anime memes"
    }
};