'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const booru = require('booru');

module.exports = {
    run: async (client, msg) => {
        booru.search('danbooru', ['sex'], {limit:1, random:true}).then(booru.commonfy).then(imgs => {
            for (const img of imgs) {
                const embed = new MessageEmbed();
                embed.setTitle('Hentai');
                embed.setDescription('If the image doesn\'t load click on the title');
                embed.setImage(img.sample_url);
                embed.setThumbnail(img.sample_url);
                embed.setURL(img.sample_url);
                embed.setFooter(`Requested by ${msg.author.tag} `, msg.author.avatarURL());
                embed.setTimestamp(Date.now());
                msg.channel.send(embed);
                if (img.sample_url.endsWith('.mp4')) {
                    msg.channel.send('```Hentai```\n\n' + img.sample_url);
                }
            }
        });
    },
    aliases: ["henti"],
    info: {
        description: "Sends you hentai",
        args: "s$hentai"
    }
};