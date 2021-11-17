let { Client, Message, MessageEmbed, version } = require("discord.js");
let utility = require("discordutility");
let { shirokoSchema } = require("../../models");

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
  function fetchMembers() {
    const promises = [
      client.shard.broadcastEval((c) =>
        c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
      ),
    ];

    return Promise.all(promises).then((results) => {
      results[0].reduce((acc, memberCount) => acc + memberCount, 0);
    });
  }

  let embed = new MessageEmbed();
  let clientUser = await shirokoSchema.findOne({ clientID: client.user.id });
  embed.setTitle("Information about Shiroko");
  embed.addFields([
    { name: "Name", value: client.user.username, inline: true },
    { name: "Bot Version", value: client.modules.version, inline: true },
    { name: "Library", value: `discord.js@${version}`, inline: true },
    { name: "Guild count", value: client.guilds.cache.size, inline: true },
    { name: "User count", value: fetchMembers(), inline: true },
    { name: "Command count", vaule: client.commands.size, inline: true },
    { name: "Aliases", value: client.aliases.size, inline: true },
    { name: "Used commands", value: clientUser.usedCommands, inline: true },
    { name: "Ping", value: "fetching...", inline: true },
    { name: "Uptime", value: "fetching...", inline: true },
  ]);

  await msg.reply({ embeds: [embed] }).then((m) => {
    const latency = m.createdTimestamp - msg.createdTimestamp;
    let converted = utility.convertMS(client.uptime);
    embed.addFields([
      { name: "Name", value: client.user.username, inline: true },
      { name: "Bot Version", value: client.modules.version, inline: true },
      { name: "Library", value: `discord.js@${version}`, inline: true },
      { name: "Guild count", value: client.guilds.cache.size, inline: true },
      { name: "User count", value: fetchMembers(), inline: true },
      { name: "Command count", vaule: client.commands.size, inline: true },
      { name: "Aliases", value: client.aliases.size, inline: true },
      { name: "Used commands", value: clientUser.usedCommands, inline: true },
      {
        name: "Ping",
        value: `API: ${Math.floor(client.ws.ping)}ms / Bot: ${Math.round(
          latency
        )}`,
        inline: true,
      },
      {
        name: "Uptime",
        value: `${converted.d} Days/${converted.h} Hours/${converted.m} Minutes`,
        inline: true,
      },
    ]);
    m.edit({ embeds: [embed] });
  });
};

exports.info = {
  description: "Get some information about Shiroko",
  cooldown: 3,
};
