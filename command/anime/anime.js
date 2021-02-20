'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const request = require('node-superfetch');

module.exports = {
    run: async (client, msg, args) => {
        function shorten(text, maxLen = 2000) {
            return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
        }
        const query = args.join(' ');
        try {
            const { text } = await request
                .get('https://kitsu.io/api/edge/anime')
                .query({ 'filter[text]': query });
            const body = JSON.parse(text);
            if (!body.data.length) return msg.reply('Could not find any results.');
            const data = body.data[0].attributes;
            const embed = new MessageEmbed()
                .setColor(0xF75239)
                .setURL(`https://kitsu.io/anime/${data.slug}`)
                .setThumbnail(data.posterImage ? data.posterImage.original : null)
                .setTitle(data.canonicalTitle)
                .setDescription(shorten(data.synopsis))
                .addField('❯ Type', `${data.showType} - ${data.status}`, true)
                .addField('❯ Episodes', data.episodeCount || '???', true)
                .addField('❯ Start Date', data.startDate ? new Date(data.startDate).toDateString() : '???', true)
                .addField('❯ End Date', data.endDate ? new Date(data.endDate).toDateString() : '???', true);
            return msg.channel.send(embed);
        } catch (err) {
            return msg.reply(`ops, something is wrong: \`${err.message}\`. please try again later !`);
        }
    },
    info: {
        description: "Search anime title to get some information about this animes",
        usage: "s$anime <search input>"
    }
};