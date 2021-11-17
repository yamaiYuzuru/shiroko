let { Client, Message, MessageEmbed } = require("discord.js");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  if (!args[0]) return msg.reply("You must give me an text");

  let embed = new MessageEmbed();
  embed.setImage(
    `https://www.minecraftskinstealer.com/achievement/a.php?i=7&h=Achievement+made%21&t=${args.join(
      "+"
    )}`
  );
  await msg.reply({ embeds: [embed] });
};

exports.info = {
  description: "Make your own achievement",
  usage: "s$achievement <text>",
  aliases: ["achieve"],
  requiredVote: true,
};
