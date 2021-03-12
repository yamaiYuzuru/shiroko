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
    run: async (client, msg, args) => {
        if (!msg.mentions.members.first()) return msg.channel.send(new MessageEmbed().setDescription('You must mention an user'));
        const gif = new Gif();
        let args2 = args.slice(1);
        if (args[1]) {
            await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} hugs ${msg.mentions.users.first().tag}\n> ${args2.join(' ')}`).setImage(gif.getHug));
        } else {
            await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} hugs ${msg.mentions.users.first().tag}`).setImage(gif.getHug));
        }
    },
    info: {
        usage: "s$hug <@user>",
        description: "Hug a user"
    }
};