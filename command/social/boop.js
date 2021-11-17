let { Client, Message, MessageEmbed } = require("discord.js");
let gif = require("../../settings/Gif");

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
  if (!msg.mentions.members.first()) {
    let embed = new MessageEmbed();
    embed.setTitle("Boop");
    embed.setDescription(`**${msg.member.displayName}** boops`);
    embed.setImage(gif.boop());
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Boop");
    embed.setDescription(
      `**${msg.member.displayName}** boops ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.boop());
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "Boop someone",
  usage: "s$boop [member]",
  cooldown: 5,
};
