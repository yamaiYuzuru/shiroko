'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const Gif = require('../../function/gif');
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg) => {
        if (!msg.mentions.members.first()) return msg.channel.send(new MessageEmbed().setDescription('You must mention an user'));
        const gif = new Gif();
        await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} kills ${msg.mentions.members.first().tag}`).setImage(gif.getKill));
    },
    info: {
        usage: "s$kill <@user>",
        description: "Kill a user"
    }
};