let {Client, Message, MessageEmbed} = require('discord.js');
let fetch = require('node-superfetch');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    fetch.get(`https://www.reddit.com/r/animemes/.json`).end((err, res) => {
        if (err) console.error(err);
        const allowed = msg.channel.nsfw ? res.body.data.children : res.body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return msg.reply('It seems we are out of memes');
        const randomnumber = Math.floor(Math.random() * allowed.length);
        const embed = new MessageEmbed()
            .setColor(0x00A2E8)
            .setTitle(allowed[randomnumber].data.title)
            .setImage(allowed[randomnumber].data.url)
            .setTimestamp(Date.now())
            .setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL({dynamic: true}));
        msg.reply({embeds: [embed]})
    });
};