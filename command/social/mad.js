let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Mad");
  embed.setDescription(`**${msg.member.displayName}** is mad`);
  embed.setImage(gif.mad());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Mad",
  usage: "s$mad",
  cooldown: 5,
};
