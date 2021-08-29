let {Client, Message, MessageEmbed} = require('discord.js');
let {economySchema} = require('../../models');
let utility = require('discordutility')
/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let user = await economySchema.findOne({userID: msg.author.id});
    if (!user) return false;

    let cooldown = 8.64e+7;

    let dailyStreak = user.dailyStreak;
    let amount;
    if (dailyStreak === 0) {
        amount = 100;
    } else {
        amount = 100 * dailyStreak+1;
    }

    let lastdaily = user.lastDaily;
    if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
        let timeObj = utility.convertMS(cooldown - (Date.now() - lastdaily));

        let rateEmbed = new MessageEmbed();
        rateEmbed.setTitle('Cooldown');
        rateEmbed.setDescription(`You'll be able to collect your next daily in ${timeObj.h} hours, ${timeObj.m} minutes and ${timeObj.s} seconds**`);
        await msg.reply({embeds: [rateEmbed]});
    } else {
        user.dailyStreak++;
        user.creditpoint += amount;
        user.lastDaily = Date.now();
        await user.save();
        let embed = new MessageEmbed();
        embed.setTitle('Daily');
        embed.setDescription(`You have been added ${amount} creditpoints <:creditpoint:745337132184240342>`);
        await msg.reply({embeds: [embed]});
    }
};

exports.info = {
    description: "Get your daily creditpoints",
    aliases: ['d']
};