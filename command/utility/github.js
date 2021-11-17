let { Client, Message, MessageEmbed } = require("discord.js");
let fetch = require("node-fetch");
let moment = require("moment");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  if (!args[0]) return msg.reply("You must give me an github username");

  fetch(`https://api.github.com/users/${args.join("-")}`)
    .then((res) => res.json())
    .then((body) => {
      if (body.message)
        return msg.reply({
          embeds: [
            {
              description: ` **User Not Found | Please Give Me A Valid Username!**`,
            },
          ],
        });
      let {
        login,
        avatar_url,
        id,
        public_repos,
        followers,
        following,
        location,
        created_at,
        bio,
      } = body;

      const embed = new MessageEmbed()
        .setAuthor(`${login} Information!`, avatar_url)
        .setColor(`RANDOM`)
        .setThumbnail(`${avatar_url}`)
        .addField(`Username`, `${login}`)
        .addField(`ID`, `${id}`)
        .addField(`Bio`, `${bio || "No Bio"}`)
        .addField(`Public Repositories`, `${public_repos || "None"}`, true)
        .addField(`Followers`, `${followers}`, true)
        .addField(`Following`, `${following}`, true)
        .addField(`Location`, `${location || "No Location"}`)
        .addField(
          `Account Created`,
          moment.utc(created_at).format("dddd, MMMM, Do YYYY")
        )
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
      msg.reply({ embeds: [embed] });
    });
};

exports.info = {
  description: "Get some information about an github user",
  usage: "s$github <github-user>",
  cooldown: 3,
};
