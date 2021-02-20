'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
let Gif = require('../../function/gif');
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg) => {
        let gif = new Gif();
        if (!msg.mentions.members.first()) return msg.channel.send(new MessageEmbed().setDescription('You must mention an user.'));
        await msg.channel.send(new MessageEmbed().setDescription(`${msg.author.tag} bullies ${msg.mentions.members.first().tag}`).setImage(gif.getBully));
    },
    info: {
        description: "You want to bully an user? hehe.",
        usage: "s$bully <@user>"
    }
};