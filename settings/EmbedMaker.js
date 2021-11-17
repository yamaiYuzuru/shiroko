let { Client, Guild, GuildMember, MessageEmbed } = require("discord.js");
let colors = require("../configs").colors;

module.exports = class EmbedMaker {
  //
  // Error Embeds
  //

  //
  // GLOBAL
  //

  static cantfindMember() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 008");
    embed.setDescription("I can't find this member.");
    embed.setColor(colors.red);
    return embed;
  }

  //
  // MessageCreate
  //

  /**
   * Embed for botbanned users.
   */
  static botBanned() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 001");
    embed.setDescription(`You are banned from Shiroko.`);
    embed.setColor(colors.red);
    return embed;
  }

  /**
   * Embed for if the commands wasn't found
   */
  static noCmd() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 002");
    embed.setDescription(
      "I can't find this command.\nPlease check if you written the command right."
    );
    embed.setColor(colors.red);
    return embed;
  }

  /**
   * Embed for commands diddn't used in NSFW marked channels.
   */
  static onlyNSFWChannel() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 003");
    embed.setDescription("Please go in to an NSFW marked channel.");
    embed.setColor(colors.red);
    return embed;
  }

  /**
   * Embed for users used admin cmds who are not an admin.
   */
  static onlyAdmins() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 004");
    embed.setDescription(
      "You must be an admin of Shiroko to use this command."
    );
    embed.setColor(colors.red);
    return embed;
  }

  /**
   * Embed for users who doesn't voted for Shiroko.
   */
  static onlyVoters() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 004");
    embed.setDescription("You must vote for Shiroko to use this command.");
    embed.setColor(colors.red);
    return embed;
  }

  /**
   * Embed for errors when command use failed.
   */
  static errorOnCMDuse() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 005");
    embed.setDescription("Something went wrong using this command.");
    embed.setColor(colors.red);
    return embed;
  }

  //
  // Buy
  //
  static cantfind() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 006");
    embed.setDescription("You must give an object from the shop.");
    embed.setColor(colors.yellow);
    return embed;
  }

  static cantbuy() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 007");
    embed.setDescription("You can't buy this.");
    embed.setColor(colors.yellow);
    return embed;
  }

  //
  // Daily
  //

  /**
   * @param {Number} h
   * @param {Number} m
   * @param {Number} s
   */
  static dailyRatelimit(h, m, s) {
    let embed = new MessageEmbed();
    embed.setTitle("Daily - Ratelimit");
    embed.setDescription(`You can use daily in ${h}:${m}:${s}.`);
    embed.setColor(colors.yellow);
    return embed;
  }

  //
  // Pay
  //

  static noAmount() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 009");
    embed.setDescription("You must give me an amount you will give.");
    embed.setColor(colors.red);
    return embed;
  }

  static notEnough() {
    let embed = new MessageEmbed();
    embed.setTitle("Error 010");
    embed.setDescription("You have not enough creditpoins.");
    embed.setColor(colors.red);
    return embed;
  }

  //
  // Normal embeds
  //

  //
  // Botban
  //

  /**
   * @param id {String}
   */
  static ban(id) {
    let embed = new MessageEmbed();
    embed.setTitle("Botban");
    embed.setDescription(`${id} was successful banned from Shiroko.`);
    embed.setColor(colors.green);
    return embed;
  }

  /**
   * @param id {String}
   */
  static unban(id) {
    let embed = new MessageEmbed();
    embed.setTitle("Botban");
    embed.setDescription(`${id} was successful unbanned from Shiroko.`);
    embed.setColor(colors.green);
    return embed;
  }

  /**
   * @param {String} shopItem
   */
  static bought(shopItem) {
    let embed = new MessageEmbed();
    embed.setTitle("Buy");
    embed.setDescription(`You had successful bought ${shopItem}`);
    embed.setColor(colors.green);
    return embed;
  }

  static daily() {
    let embed = new MessageEmbed();
    embed.setTitle("Daily");
    embed.setDescription(
      `You had successfuly claimed your daily 150 creditpoints <:creditpoint:909690652005109800>.`
    );
    embed.setColor(colors.yellow);
  }

  /**
   *
   * @param {GuildMember} member
   * @param {Number} amount
   */
  static paid(member, amount) {
    let embed = new MessageEmbed();
    embed.setTitle("Pay");
    embed.setDescription(
      `You gave successful ${amount}<:creditpoint:909690652005109800> to ${member.user.tag}.`
    );
    embed.setColor(colors.green);
    return embed;
  }

  static helpCommand() {
    let embed = new MessageEmbed();
    embed.setTitle("Categories");
    embed.setDescription(
      "```Please use the dropdown menu under this message to see in the categories.```\n`Note: The NSFW category shows only in NSFW marked channels.`"
    );
    embed.addField(
      "Bot links",
      "• Shiroko discord-server: [discord.gg/uTFFUcbruU](https://discord.gg/uTFFUcbruU)\n• Add Shiroko to your server: [Invite](https://kirin-dev.ml/invite.php?b=shiroko)\n• Vote for Shiroko: [Upvote](https://top.gg/bot/803387328294027264/vote)"
    );
    embed.setImage(
      "https://shiroko.ml/cdn/banners/HelpCommandBanner_StartPage.png"
    );
    return embed;
  }

  static helpCat(category, cat) {
    let embed = new MessageEmbed();
    embed.setTitle(category);
    embed.addFields(
      cat.commands.map((cmd) => {
        return {
          name: cmd.name,
          value: cmd.description,
          inline: true,
        };
      })
    );
  }
};
