let { Client, Message, MessageEmbed } = require("discord.js");
let booru = require("booru");

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
  if (!args[0]) return msg.reply("Give me an search input");
  booru
    .search("gelbooru", [`${args.join("_")}`, "rating:explicit"], {
      limit: 1,
      random: true,
    })
    .then(async (results) => {
      let posts = results.posts;
      for (let post of posts) {
        if (post.sample_url.endsWith(".mp4"))
          return msg.reply(
            "````Hentai - " + args.join(" ") + "```\n" + post.sample_url
          );
        let embed = new MessageEmbed();
        embed.setTitle(`Hentai`);
        embed.setImage(post.sample_url);
        embed.setURL(post.sample_url);
        embed.setFooter("If the image wasn't loaded click on the title");
        await msg.reply({ embeds: [embed] });
      }
    })
    .catch((e) => {
      console.log(e);
      msg.reply("Something went wrong");
    });
};

exports.info = {
  description: "Search some hentai pics on Gelbooru",
  aliases: ["gelb"],
  cooldown: 5,
};
