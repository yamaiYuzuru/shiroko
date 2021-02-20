'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');
module.exports = async (client, guild) => {
    await guild.channels.cache.get('811238806153986100').setName(`Shiroko-Guild Count: ${client.guilds.cache.size}`);
    await guild.channels.cache.get("785884948887765022").send(new MessageEmbed().setTitle('Shiroko was removed').addField('Guild Name', guild.name).addField("Guild Owner", guild.member(guild.owner).user.tag).addField("Guild Membercount", guild.memberCount).setTimestamp(Date.now()).setFooter(`Shiroko is now on ${client.guilds.cache.size} Servers`));
};