'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const kitsu = require('node-kitsu');

module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) return msg.channel.send("Please specify a manga name.");
        let aniname = args.join(" ");
        let results;
        try {
            results = await kitsu.searchManga(aniname, 0);
        } catch (ex) {
            if (ex.message.indexOf("ERR_UNESCAPED_CHARACTERS") !== -1) {
                await msg.channel.send("This command only accepts English and Romaji titles. Please translate the title and try again.");
            } else {
                await msg.channel.send("An error occurred running this command. Please try again later.");
            }
            return client.console.error(`${ex}`);
        }
        if (!results) {
            await msg.channel.send("No results found");
            return;
        }
        let fieldarry = [];
        for (let i=0;i<results.length;i++) {
            let aniresult = results[i].attributes;
            fieldarry[i] = {
                "name": aniresult.titles.en || aniresult.canonicalTitle || aniresult.titles.en_jp,
                "value": `Rating: ${aniresult.averageRating || 0}%\nChapters: ${aniresult.chapterCount || 0}\nStatus: ${aniresult.status === "tba" ? "TBA" : `${aniresult.status.charAt(0).toUpperCase()}${aniresult.status.substr(1).toLowerCase()}`}\n[Kitsu.io](https://kitsu.io/manga/${aniresult.slug})`
            };
        }
        await msg.channel.send({
            "embed": {
                "title": "Search Results",
                "description": "\u200b",
                "color": "#fd8320",
                "fields": fieldarry
            }
        });
    },
    info: {
        description: "Search for mangas",
        usage: "s$manga <search input>"
    }
};