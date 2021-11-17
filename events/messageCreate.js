let { Client, Message } = require("discord.js");
let { userSchema, economySchema, shirokoSchema } = require("../models");
let LevelClass = require("../settings/LevelClass");
let embedMaker = require("../settings/EmbedMaker");

/**
 * @param {Client} client
 * @param {Message} msg
 */
module.exports = async (client, msg) => {
  if (msg.author.bot) return false;

  let user;
  let economyUser = await economySchema.findOne({ userID: msg.author.id });
  let clientUser = await shirokoSchema.findOne({ clientID: client.user.id });
  if (!(await userSchema.findOne({ userID: msg.author.id }))) {
    let newUser = await userSchema.create({
      userID: msg.author.id,
      joinedTimestamp: Math.floor(new Date().getTime() / 1000.0),
    });
    await newUser.save();
    user = newUser;
  } else {
    user = await userSchema.findOne({ userID: msg.author.id });
  }
  if (!economyUser) {
    let newUser = await economySchema.create({
      userID: msg.author.id,
      lastDaily: null,
    });

    await newUser.save();
  }

  let randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  await LevelClass.appendXp(msg.author.id, randomAmountOfXp);

  const prefixes = user.prefixes;
  if (!prefixes.length === 0) return;
  const prefix = prefixes.find((p) =>
    msg.content.startsWith(p.toLocaleLowerCase())
  );
  if (!prefix) return false;

  if (clientUser.botBannedUsers.includes(msg.author.id))
    return msg.reply("Sorry you was banned from shiroko");

  let args = msg.content.slice(prefix.length).trim().split(" ");
  let command = args.shift().toLocaleLowerCase();
  let cmd = client.commands.get(command) || client.aliases.get(command);

  if (!cmd)
    return msg.reply(
      "I can't find this command.\nPlease check if you have written the command right"
    );

  if (cmd.info.category === "nsfw" && !msg.channel.nsfw)
    return msg.reply("This comamnd works only in nsfw channels");
  if (
    cmd.info.category === "admin" &&
    !client.config.admins.includes(msg.author.id)
  )
    return msg.reply("You must be an admin of me to use this command");

  if (
    cmd.info.requiredVote === true &&
    !(await client.modules.dbl.hasVoted(msg.author.id))
  )
    return msg.reply("You must vote for Shiroko!\nTo use this command");
  try {
    await cmd.run(client, msg, args);
    clientUser.usedCommands++;
    await clientUser.save();
  } catch (error) {
    console.error(error);
    msg.reply({ embeds: [client.modules.EmbedMaker.errorOnCMDuse()] });
  }
};
