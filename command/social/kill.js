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
    embed.setTitle("Kill");
    embed.setDescription(`**${msg.member.displayName}** kills`);
    embed.setImage(gif.kill);
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Kill");
    embed.setDescription(
      `**${msg.member.displayName}** kills ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.kill());
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "Kills someone",
  usage: "s$kills [member]",
  cooldown: 5,
};
