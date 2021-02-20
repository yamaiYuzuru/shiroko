'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const {search, commonfy} = require('booru');

module.exports = {
    run: async (client, msg) => {
        search('danbooru', ["futanari", "rating:explicit"], {random:true, limit:1}).then(commonfy).then(posts => {
            for (let post of posts) {
                let embed = new MessageEmbed();
                embed.setTitle('Hentai - Futanari');
                embed.setDescription('If the image doesn\'t load click on the title');
                embed.setImage(post.sample_url);
                embed.setThumbnail(post.sample_url);
                embed.setFooter(`Requested by ${msg.author.tag}`);
                embed.setTimestamp(Date.now());
                msg.channel.send(embed);
                if (post.sample_url.endsWith('.mp4')) {
                    msg.channel.send('```Hentai - Futanari```\n\n' + post.sample_url);
                }
            }
        })
    },
    info: {
        description: "Get some random futanari hentais"
    }
};