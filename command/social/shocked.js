let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Shocked");
  embed.setDescription(`**${msg.member.displayName}** is shocked`);
  embed.setImage(gif.shocked());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Shocked",
  usage: "s$shocked",
  cooldown: 5,
};
