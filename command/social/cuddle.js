let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");
/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  if (!msg.mentions.members.first()) {
    let embed = new MessageEmbed();
    embed.setTitle("Cuddle");
    embed.setDescription(`**${msg.member.displayName}** cuddles`);
    embed.setImage(gif.cuddle());
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Cuddle");
    embed.setDescription(
      `**${msg.member.displayName}** cuddles ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.cuddle);
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "cuddle someone",
  usage: "s$cuddle [member]",
  cooldown: 5,
};
