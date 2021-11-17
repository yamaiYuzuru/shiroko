let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");
/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  embed.setTitle("Die");
  embed.setDescription(`**${msg.member.displayName}** dies`);
  embed.setImage(gif.die());
  return msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Dies",
  usage: "s$die",
  cooldown: 5,
};
