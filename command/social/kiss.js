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
    embed.setTitle("Kiss");
    embed.setDescription(`**${msg.member.displayName}** kisses`);
    embed.setImage(gif.kiss());
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Kiss");
    embed.setDescription(
      `**${msg.member.displayName}** kisses ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.kiss());
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "Kiss someone",
  usage: "s$kiss[member]",
  cooldown: 5,
};
