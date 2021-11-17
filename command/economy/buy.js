let { Client, Message, MesssgeEmbed } = require("discord.js");
let { economySchema } = require("../../models");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let user = await economySchema.findOne({ userID: msg.author.id });

  if (!user) return;

  if (!args[0])
    return msg.reply("You must give me an object what you buy from s$shop.");

  let shopObjects = [
    "Blue Archive 1",
    "Blue Archive 2",
    "Blue Archive 3",
    "Blue Archive 4",
  ];

  if (!shopObjects.includes(args.join(" ")))
    return msg.reply({ embeds: [client.EmbedMaker.cantfind()] });

  if (args.join(" ") === "Blue Archive 1") {
    if (user.creditpoint < 5000)
      return msg.reply({ embeds: [client.EmbedMaker.cantbuy()] });
    user.items.push("ba1");
    user.creditpoint -= 5000;
    await user.save();
  } else if (args.join(" ") === "Blue Archive 2") {
    if (user.creditpoint < 10000)
      return msg.reply({ embeds: [client.EmbedMaker.cantbuy()] });
    user.items.push("ba2");
    user.creditpoint -= 10000;
    await user.save();
  } else if (args.join(" ") === "Blue Archive 3") {
    if (user.creditpoint < 15000)
      return msg.reply({ embeds: [client.EmbedMaker.cantbuy()] });
    user.items.push("ba3");
    user.creditpoint -= 15000;
    await user.save();
  } else if (args.join(" ") === "Blue Archive 4") {
    if (user.creditpoint < 20000)
      return msg.reply({ embeds: [client.EmbedMaker.cantbuy()] });
    user.items.push("ba4");
    user.creditpoint -= 20000;
    await user.save();
  }

  msg.reply({ embeds: [client.EmbedMaker.bought(args.join(" "))] });
};

exports.info = {
  description: "Buy an object",
  usage: "s$buy <Shop object>",
};
