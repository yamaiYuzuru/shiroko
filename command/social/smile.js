let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Smile");
  embed.setDescription(`**${msg.member.displayName}** is happy`);
  embed.setImage(gif.smile());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Smiles",
  usage: "s$smile",
  cooldown: 5,
};
