let {Client, Message, MessageEmbed} = require('discord.js');
let fetch = require('node-fetch');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    const data = await fetch("https://api.adviceslip.com/advice").then((res) => res.json());

    const embed = new MessageEmbed();
    embed.setDescription(data.slip.advice);
    embed.setColor("RANDOM");
    await msg.reply({embeds: [embed]});
};

exports.info = {
    description: "Get an advice"
};