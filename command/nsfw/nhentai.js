'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
let nhentai = require('nhentai');
let api = new nhentai.API();
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg, args) => {
        if (!args[0]) {
            const random = await api.randomDoujinID();
            await api.fetchDoujin(random).then(doujin => {
                const images = doujin.pages;
                let pg = 0;
                let embed = new MessageEmbed()
                    .setTitle(doujin.titles.english)
                    .setColor("#FF69B4")
                    .setThumbnail(doujin.thumbnail.url)
                    .setImage(images[pg].url)
                    .setURL(images[pg].url)
                    .setFooter("Tags: " + doujin.tags.map(t => t.name).join(', '));
                    msg.channel.send(embed).then(mssg => {
                    mssg.react("⬅️");
                    mssg.react("➡️");

                    const collector = mssg.createReactionCollector(
                        (reaction, user) =>
                            ["⬅️", "➡️"].includes(reaction.emoji.name) &&
                            user.id === msg.author.id,
                        { time: 120000 }
                    );

                    collector.on("collect", reaction => {

                        reaction.users.remove(msg.author).then(async () => {
                            if (reaction.emoji.name === "➡️") {


                                if (!images[pg + 1]) {
                                    // eslint-disable-next-line no-self-assign
                                    pg = pg
                                } else {
                                    pg = pg + 1
                                }
                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("#FF69B4")
                                    .setThumbnail(doujin.thumbnail.url)
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setFooter("Tags: " + doujin.tags.map(t => t.name).join(', '));
                                await mssg.edit(embed);
                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }

                            else if (reaction.emoji.name === "⬅️") {


                                if (!images[pg - 1]) {

                                    // eslint-disable-next-line no-self-assign
                                    pg = pg
                                } else {
                                    pg = pg - 1
                                }

                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("#FF69B4")
                                    .setThumbnail(doujin.thumbnail.url)
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setFooter("Tags: " + doujin.tags.join(', '));
                                await mssg.edit(embed);

                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }
                        })

                    });

                    collector.on('end', () => {
                        if (mssg) {
                            mssg.reactions.removeAll()
                        }
                    });
                })
            });
        } else {
            await api.fetchDoujin(args[0]).then(doujin => {
                const images = doujin.pages;
                let pg = 0;
                let embed = new MessageEmbed()
                    .setTitle(doujin.titles.english)
                    .setColor("#FF69B4")
                    .setThumbnail(doujin.thumbnail.url)
                    .setImage(images[pg].url)
                    .setURL(images[pg].url)
                    .setFooter("Tags: " + doujin.tags.join(', '));

                msg.channel.send(embed).then(mssg => {
                    mssg.react("⬅️");
                    mssg.react("➡️");

                    const collector = mssg.createReactionCollector(
                        (reaction, user) =>
                            ["⬅️", "➡️"].includes(reaction.emoji.name) &&
                            user.id === msg.author.id,
                        { time: 120000 }
                    );

                    collector.on("collect", reaction => {

                        reaction.users.remove(msg.author).then(async () => {
                            if (reaction.emoji.name === "➡️") {


                                if (!images[pg + 1]) {
                                    // eslint-disable-next-line no-self-assign
                                    pg = pg
                                } else {
                                    pg = pg + 1
                                }
                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("#FF69B4")
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setThumbnail(doujin.thumbnail.url)
                                    .setFooter("Tags: " + doujin.tags.join(', '));
                                await mssg.edit(embed);
                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }

                            else if (reaction.emoji.name === "⬅️") {


                                if (!images[pg - 1]) {
                                    // eslint-disable-next-line no-self-assign
                                    pg = pg
                                } else {
                                    pg = pg - 1
                                }

                                embed = new MessageEmbed()
                                    .setTitle(doujin.titles.english)
                                    .setColor("#FF69B4")
                                    .setImage(images[pg].url)
                                    .setURL(images[pg].url)
                                    .setFooter("Tags: " + doujin.tags.join(', '));
                                await mssg.edit(embed);

                                await mssg.react("⬅️");
                                await mssg.react("➡️");
                            }
                        })

                    });

                    collector.on('end', () => {
                        if (mssg) {
                            mssg.reactions.removeAll()
                        }
                    });
                });

            });
        }
    },
    info: {
        description: "Get an random doujin | Search for an doujin",
        usage: "s$nhentai [sauce code]"
    },
    aliases: ["nh", "n-hentai", "n-h", "n_hentai"]
};