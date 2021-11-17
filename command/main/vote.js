let { Client, Message, MessageEmbed } = require("discord.js");

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
  let embed = new MessageEmbed();
  embed.setDescription(
    "Thanks for your idea to vote for me.\n[Click me](https://top.gg/bot/803387328294027264/vote) for voting"
  );
  await msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Vote for Shiroko",
  cooldown: 2,
};
