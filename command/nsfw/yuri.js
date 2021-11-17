let { Client, Message, MessageEmbed } = require("discord.js");
let booru = require("booru");

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
  booru
    .search("danbooru", ["yuri", "rating:explicit"], {
      limit: 1,
      random: true,
    })
    .then(async (results) => {
      let posts = results.posts;
      for (let post of posts) {
        if (post.sample_url.endsWith(".mp4"))
          return msg.reply("````Hentai - Yuri```\n" + post.sample_url);
        let embed = new MessageEmbed();
        embed.setTitle(`Hentai - Yuri`);
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
  description: "Get some yuri hentai pics",
  cooldown: 5,
};
