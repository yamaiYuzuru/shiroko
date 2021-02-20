'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed, version} = require('discord.js');
const util = require('discordutility');
module.exports = {
    run: async (client, msg) => {
        const uptime = util.convertMS(client.uptime, true, true);
        let embed = new MessageEmbed();
        embed.setTitle("Information about Shiroko");
        embed.setThumbnail(client.user.avatarURL());
        embed.addField("Library", `discord.js@${version}`, true);
        embed.addField("Guild Count", `${client.guilds.cache.size}`, true);
        embed.addField('User Count', `${client.users.cache.size}`, true);
        embed.addField("Command Count", `${client.cmds.size}`, true);
        embed.addField('Aliases Count', `${client.aliases.size}`, true);
        embed.addField('Ping', 'pinging...', true);
        embed.setTimestamp(Date.now());
        embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
        msg.channel.send(embed).then(m => {
            const latency = m.createdTimestamp - msg.createdTimestamp;
            embed = new MessageEmbed();
            embed.setTitle("Information about Shiroko");
            embed.setThumbnail(client.user.avatarURL());
            embed.addField("Library", `discord.js@${version}`, true);
            embed.addField("Guild Count", `${client.guilds.cache.size}`, true);
            embed.addField('User Count', `${client.users.cache.size}`, true);
            embed.addField("Command Count", `${client.cmds.size}`, true);
            embed.addField('Aliases Count', `${client.aliases.size}`, true);
            embed.addField('Ping', `API Latency: ${Math.floor(client.ws.ping)}ms\nBot Latency: ${latency}ms`, true);
            embed.addField('Uptime', `Days ${uptime.d} / Hours ${uptime.h} / Minutes ${uptime.m}`);
            embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
            embed.setTimestamp(Date.now());
            m.edit(embed);
        });
    },
    info: {
        description: "Get information about Shiroko"
    }
};