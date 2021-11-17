let { Client, Message, MessageEmbed } = require("discord.js");
let { economySchema } = require("../../models");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let member =
    msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
  if (!member)
    return msg.reply({ embeds: [client.EmbedMaker.cantfindMember()] });
  if (!args[1]) return msg.reply({ embeds: [client.EmbedMaker.noAmount()] });
  let user1 = await economySchema.findOne({ userID: msg.author.id });
  let user2 = await economySchema.findOne({ userID: member.user.id });

  if (!user1 || !user2) return false;

  if (args[1] > user1.creditpoint)
    return msg.reply({ embeds: [client.EmbedMaker.notEnough()] });

  user1.creditpoint -= Math.round(args[1] - 0);
  user2.creditpoint += Math.round(args[1] - 0);
  await user1.save();
  await user2.save();

  await msg.reply({ embeds: [client.EmbedMaker.paid(member, args[1])] });
};

exports.info = {
  description: "Give some Creditpoints to an user",
  usage: "s$pay <@user/userID> <amount>",
  aliases: ["give"],
};
