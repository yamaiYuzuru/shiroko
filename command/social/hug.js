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
    embed.setTitle("Hug");
    embed.setDescription(`**${msg.member.displayName}** hugs`);
    embed.setImage(gif.hug());
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Hug");
    embed.setDescription(
      `**${msg.member.displayName}** hugs ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.hug());
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "Hug someone",
  usage: "s$hug [member]",
  cooldown: 5,
};
