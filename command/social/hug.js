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
        await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} hugs ${msg.mentions.members.first().tag}`).setImage(gif.getHug));
    },
    info: {
        usage: "s$hug <@user>",
        description: "Hug a user"
    }
};