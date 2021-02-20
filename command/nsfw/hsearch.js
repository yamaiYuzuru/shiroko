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
    run: async (client, msg, args) => {
        if (!args[0]) {return msg.channel.send(new MessageEmbed().setDescription('You need to enter an search input'));}
        booru.search('danbooru', ["rating:explicit", args.join('_')], {random:true, limit:1}).then(booru.commonfy).then(posts => {
            for (let post of posts) {
                const embed = new MessageEmbed();
                embed.setTitle(`Hentai - ${args.join(' ')}`);
                embed.setDescription('If the imgae doesn\'t load click on the title');
                embed.setImage(post.sample_url);
                embed.setURL(post.sample_url);
                embed.setFooter(`Requested by ${msg.author.tag}`);
                embed.setTimestamp(Date.now());
                msg.channel.send(embed);
                if (post.sample_url.endsWith('.mp4')) msg.channel.send('```Hentai - ' + args.join(' ') + "```\n\n" + post.sample_url);
            }
        }).catch((e) => {
            console.error(e);
            msg.channel.send(new MessageEmbed().setDescription(`Can't find anything for ${args.join(' ')}\nI think you would search more as one tag.`))
        })
    },
    info: {
        description: "Search for hentais",
        args: "s$hserach <search input>",
    }
};