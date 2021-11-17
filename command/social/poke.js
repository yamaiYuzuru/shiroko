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
    embed.setTitle("Poke");
    embed.setDescription(`**${msg.member.displayName}** pokes`);
    embed.setImage(gif.poke());
    return msg.reply({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed();
    embed.setTitle("Poke");
    embed.setDescription(
      `**${msg.member.displayName}** pokes ${
        msg.mentions.members.first().displayName
      }`
    );
    embed.setImage(gif.poke());
    return msg.reply({ embeds: [embed] });
  }
};

exports.info = {
  description: "Poke someone",
  usage: "s$poke [member]",
  cooldown: 5,
};
