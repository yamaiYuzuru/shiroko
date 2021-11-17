let {Client, Message, MessageEmbed} = require('discord.js');
let {economySchema} = require('../../models');
let utility = require('discordutility');
/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let user = await economySchema.findOne({userID: msg.author.id});
    if (!user) return false;

    let cooldown = 1.44e+7;

    let amount = Math.floor(Math.random() * 500);

    let lastWork = user.lastWork;
    if (lastWork !== null && cooldown - (Date.now() - lastWork) > 0) {
        let timeObj = utility.convertMS(cooldown - (Date.now() - lastWork));

        let rateEmbed = new MessageEmbed();
        rateEmbed.setTitle('Cooldown');
        rateEmbed.setDescription(`You'll be able to work in ${timeObj.h} hours, ${timeObj.m} minutes and ${timeObj.s} seconds`);
        await msg.reply({embeds: [rateEmbed]});
    } else {
        user.creditpoint += amount;
        user.lastWork = Date.now();
        await user.save();
        let workJobs = ['Programmer', 'Policeman', 'Hacker', 'Surgeon', 'Vet'];
        let embed = new MessageEmbed();
        embed.setTitle('Work');
        embed.setDescription(`You have worked as an ${workJobs[Math.floor(Math.random() * workJobs.length)]} and you have been payed ${amount} creditpoints <:creditpoint:745337132184240342>`);
        await msg.reply({embeds: [embed]});
    }
};

exports.info = {
    description: "Get your work creditpoints"
};