let {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  let embed = new MessageEmbed();
  if (args[0]) {
    let cmd =
      client.commands.get(args[0].toLowerCase()) ||
      client.aliases.get(args[0].toLowerCase());
    if (!cmd)
      return msg.channel.send(
        embed.setDescription(`Can't find the command ${args[0]}.`)
      );

    embed.setTitle(`s$${cmd.info.name}`);
    embed.setDescription(cmd.info.description || "No description provided.");
    embed.addField("Usage", `\`${cmd.info.usage || `s$${cmd.info.name}`}\``);
    embed.setFooter(
      `Requested by ${msg.author.tag} | [] => must not, <> => must`,
      msg.author.avatarURL()
    );
    if (cmd.info.aliases)
      embed.addField("Aliases", `${cmd.info.aliases.join(", ")}`);
    return msg.reply({ embeds: [embed] });
  }

  let directories = [];
  if (!msg.channel.nsfw) {
    directories.push(
      ...new Set(
        client.commands
          .sort((cmd) => cmd.info.category.localeCompare(cmd.info.category[0]))
          .map((cmd) => cmd.info.category)
          .filter((c) => !hidden_category.some((cc) => c === cc))
          .filter((c) => c !== "nsfw")
      )
    );
  } else {
    directories.push(
      ...new Set(
        client.commands
          .sort((cmd) => cmd.info.category.localeCompare(cmd.info.category[0]))
          .map((cmd) => cmd.info.category)
          .filter((c) => !hidden_category.some((cc) => c === cc))
      )
    );
  }
  let formatString = (str) =>
    `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

  let categories = directories.map((dir) => {
    let getCommands = client.commands
      .sort((cmd) => cmd.info.name.localeCompare(cmd.info.name[0]))
      .filter((cmd) => cmd.info.category === dir)
      .map((cmd) => {
        return {
          name: cmd.info.name,
          description: cmd.info.description || "Not provided",
        };
      });

    return {
      directory: formatString(dir),
      commands: getCommands,
    };
  });

  const components = (state) => [
    new MessageActionRow().addComponents([
      new MessageSelectMenu()
        .setCustomId("cmd_help_menu")
        .setPlaceholder("Please select a category")
        .setDisabled(state)
        .addOptions(
          categories.map((cmd) => {
            return {
              label: cmd.directory,
              value: cmd.directory.toLowerCase(),
              description: `Commands in the category ${cmd.directory}`,
              emoji: emojis[cmd.directory.toLowerCase()] || null,
            };
          })
        ),
    ]),
  ];

  await msg.reply({
    embeds: [client.modules.EmbedMaker.helpCommand()],
    components: components(false),
  });

  let filter = (interaction) => interaction.user.id === msg.author.id;
  let collector = msg.channel.createMessageComponentCollector({
    filter: filter,
    componentType: "SELECT_MENU",
  });

  collector.on("collect", (i) => {
    let [directory] = i.values;
    let cat = categories.find((x) => x.directory.toLowerCase() === directory);

    embed = new MessageEmbed();
    embed.setTitle(directory);
    embed.addFields(
      cat.commands.map((cmd) => {
        return {
          name: cmd.name,
          value: cmd.description,
          inline: true,
        };
      })
    );
    embed.setImage(banners[directory.toLowerCase()]);

    i.update({
      embeds: [embed],
    });
  });
};

let hidden_category = ["admin"];
let emojis = {
  fun: "910179218959237150",
  utility: "⚙",
  settings: "🌸",
  economy: "909690652005109800",
  main: "🍥",
  moderation: "🚨",
  nsfw: "🔞",
  profile: "📰",
  social: "🤝",
};

let banners = {
  main: "https://shiroko.ml/cdn/banners/HelpCommandBanner_MainPage.png",
  fun: "https://shiroko.ml/cdn/banners/HelpCommandBanner_FunPage.png",
  economy: "https://shiroko.ml/cdn/banners/HelpCommandBanner_EconomyPage.png",
  utility: "https://shiroko.ml/cdn/banners/HelpCommandbBanner_UtilityPage.png",
  moderation:
    "https://shiroko.ml/cdn/banners/HelpCommandBanner_ModerationPage.png",
  nsfw: "https://shiroko.ml/cdn/banners/HelpCommandBanner_NSFWPage.png",
  profile: "https://shiroko.ml/cdn/banners/HelpCommandBanner_ProfilePage.png",
  soical: "https://shiroko.ml/cdn/banners/HelpCommandBanner_SocialPage.png",
};
