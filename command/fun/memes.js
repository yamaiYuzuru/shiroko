let {Client, Message, MessageEmbed} = require('discord.js');
let puppy = require('random-puppy');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    await puppy('memes').then(url => {
        let embed = new MessageEmbed();
        embed.setTitle('Meeeeeems');
        embed.setURL(url);
        embed.setTimestamp(Date.now());
        embed.setImage(url);
        embed.setFooter(`Requested by ${msg.author.tag}`, msg.author.avatarURL());
        msg.reply({embeds: [embed]});
    });
};

exports.info = {
    description: "Get some memes"
};