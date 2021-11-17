let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Blush");
  embed.setDescription(`**${msg.member.displayName}** is blushing`);
  embed.setImage(gif.blush());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Blush",
  usage: "s$blush",
  cooldown: 5,
};
