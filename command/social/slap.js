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
    embed.setTitle("Slap");
    embed.setDescription(`**${msg.member.displayName}** slaps`);
    embed.setImage(gif.slap());
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Slap");
    embed.setDescription(
      `**${msg.member.displayName}** slaps ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.slap());
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "Slap someone",
  usage: "s$slap [member]",
  cooldown: 5,
};
