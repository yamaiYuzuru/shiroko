let { Client, Message, MessageAttachment, Snowflake } = require("discord.js");
let LevelClass = require("../../settings/LevelClass");
let { Rank } = require("canvacord");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let member =
    msg.mentions.members.first() ||
    msg.guild.members.cache.get(args[0]) ||
    msg.member;
  let user = await LevelClass.fetch(member.user.id, true);

  let rankCard = new Rank();
  rankCard.setAvatar(member.user.avatarURL({ format: "png" }));
  rankCard.setLevel(user.level);
  rankCard.setUsername(member.user.username);
  rankCard.setDiscriminator(member.user.discriminator);
  rankCard.setCurrentXP(user.cleanXp);
  rankCard.setRequiredXP(user.cleanNextLevelXp);
  rankCard.setProgressBar("#6270a7");

  if (user.background === "ba0") {
    rankCard.setBackground(
      "IMAGE",
      "https://shiroko.ml/rank-card/background/ba0.jpg"
    );
  } else if (user.background === "ba1") {
    rankCard.setBackground(
      "IMAGE",
      "https://shiroko.ml/rank-card/background/ba1.jpg"
    );
  } else if (user.background === "ba2") {
    rankCard.setBackground(
      "IMAGE",
      "https://shiroko.ml/rank-card/background/ba2.jpg"
    );
  } else if (user.background === "ba3") {
    rankCard.setBackground(
      "IMAGE",
      "https://shiroko.ml/rank-card/background/ba3.jpg"
    );
  } else if (user.background === "ba4") {
    rankCard.setBackground(
      "IMAGE",
      "https://shiroko.ml/rank-card/background/ba4.jpg"
    );
  }

  let attachment = new MessageAttachment(
    await rankCard.build({}),
    "rank-card.png"
  );

  await msg.reply("Generating your rank-card...").then((m) => {
    m.edit({ content: null, files: [attachment] });
  });
};

exports.info = {
  description: "Get your or a users level stats",
  cooldown: 2,
};
