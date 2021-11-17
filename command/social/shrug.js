let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Shrug");
  embed.setDescription(`**${msg.member.displayName}** shrugs`);
  embed.setImage(gif.shrug());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Shrugs",
  usage: "s$shrug",
  cooldown: 5,
};
