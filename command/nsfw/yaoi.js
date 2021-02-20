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
        search("danbooru", ['rating:explicit', 'yaoi'], {random:true, limit:1}).then(commonfy).then(imgs => {
            for (const img of imgs) {
                let embed = new MessageEmbed();
                embed.setTitle('Hentai - Yaoi');
                embed.setDescription('If the image doesn\'t load click on the title');
                embed.setThumbnail(img.sample_url);
                embed.setImage(img.sample_url);
                embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
                embed.setTimestamp(Date.now());
                msg.channel.send(embed);
                if (img.sample_url.endsWith('.mp4')) {
                    msg.channel.send('```Hentai - Yaoi```\n\n' + img.sample_url);
                }
            }
        });
    },
    info: {
        description: "Get some yaoi hentais",
        args: "s$yaoi"
    }
};