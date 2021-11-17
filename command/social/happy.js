let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");
/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Happy");
  embed.setDescription(`**${msg.member.displayName}** is happy`);
  embed.setImage(gif.happy());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Happy",
  usage: "s$happy",
  cooldown: 5,
};
