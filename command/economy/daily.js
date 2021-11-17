let { Client, Message, MessageEmbed } = require("discord.js");
let { economySchema } = require("../../models");
let utility = require("discordutility");
/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
  let user = await economySchema.findOne({ userID: msg.author.id });
  if (!user) return false;

  let cooldown = 8.64e7;

  let amount = 150;

  let lastdaily = user.lastDaily;
  if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
    let timeObj = utility.convertMS(cooldown - (Date.now() - lastdaily));

    await msg.reply({
      embeds: [
        client.EmbedMaker.dailyRatelimit(timeObj.d, timeObj.m, timeObj.s),
      ],
    });
  } else {
    user.creditpoint += amount;
    user.lastDaily = Date.now();
    await user.save();

    await msg.reply({ embeds: [client.EmbedMaker.daily()] });
  }
};

exports.info = {
  description: "Get your daily creditpoints",
  aliases: ["d"],
};
