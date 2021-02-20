'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = {
    run: async (client, msg, args) => {
        let random = Math.floor(Math.random() * 111);
        let text = await fetch(`https://hdqwalls.com/category/anime-wallpapers/page/${random}`, { method: "GET" });
        text = await text.text();
        let $ = cheerio.load(text);
        let images = [];

        $('img[class="thumbnail img-responsive custom_width"]').each(function(i, elem) {
            images.push($(this).attr('src'));
        });



        let limit = images.length;
        let pg = 0;
        let embed = new MessageEmbed()
            .setTitle('Here some wallpapers')
            .setColor("#FF69B4")
            .setImage(images[pg].replace("/thumb", ""))
            .setURL(images[pg].replace("/thumb", ""));

        const mssg = await msg.channel.send(embed);

        await mssg.react("⬅️");
        await mssg.react("➡️");

        const collector = mssg.createReactionCollector(
            // only collect left and right arrow reactions frnodom the message author
            (reaction, user) =>
                ["⬅️", "➡️"].includes(reaction.emoji.name) &&
                user.id === msg.author.id,
            // time out after a minute
            { time: 120000 }
        );

        collector.on("collect", reaction => {

            reaction.users.remove(msg.author).then(async () => {
                if (reaction.emoji.name === "➡️") {


                    if (!images[pg + 1]) {
                        pg = pg
                    } else {
                        pg = pg + 1
                    }
                    embed = new MessageEmbed()
                        .setTitle('Here some wallpapers')
                        .setColor("#FF69B4")
                        .setImage(images[pg].replace("/thumb", ""))
                        .setURL(images[pg].replace("/thumb", ""));
                    await mssg.edit(embed);
                    await mssg.react("⬅️");
                    await mssg.react("➡️");
                }

                else if (reaction.emoji.name === "⬅️") {


                    if (!images[pg - 1]) {

                        pg = pg
                    } else {
                        pg = pg - 1
                    }

                    embed = new MessageEmbed()
                        .setTitle('Here some wallpapers')
                        .setColor("#FF69B4")
                        .setImage(images[pg].replace("/thumb", ""))
                        .setURL(images[pg].replace("/thumb", ""));
                    await mssg.edit(embed);

                    await mssg.react("⬅️");
                    await mssg.react("➡️");
                }
            })

        });

        collector.on('end', collected => {
            if (mssg) {
                mssg.reactions.removeAll()
            }
        });
    },
    info: {
        description: "Shows you anime wallpapers"
    }
};