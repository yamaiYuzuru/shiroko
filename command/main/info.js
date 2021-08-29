let {Client, Message, MessageEmbed, version} = require('discord.js');
let utility = require('discordutility');
let {shirokoSchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 */
exports.run = async (client, msg) => {
    let embed = new MessageEmbed();
    let clientUser = await shirokoSchema.findOne({clientID: client.user.id});
    embed.setTitle('Information about Shiroko');
    embed.setDescription(`• **Name**: ${client.user.username}\n• **Developer(s)**: !yuzuru.#4112\n• **Bot Version**: ${client.modules.version}\n• **Library**: discord.js@${version}\n• **Guild count**: ${client.guilds.cache.size}\n• **User count**: ${client.users.cache.size}\n• **Command count**: ${client.commands.size}\n• **Aliases count**: ${client.aliases.size}\n• **Used commands**: ${clientUser.usedCommands}\n• **Ping**: fetching...\n• **Uptime**: fetching...`);
    await msg.reply({embeds: [embed]}).then(m => {
        const latency = m.createdTimestamp - msg.createdTimestamp;
        let converted = utility.convertMS(client.uptime);
        embed.setDescription(`• **Name**: ${client.user.username}\n• **Developer(s)**: !yuzuru.#4112\n• **Bot Version**: ${client.modules.version}\n• **Library**: discord.js@${version}\n• **Guild count**: ${client.guilds.cache.size}\n• **User count**: ${client.users.cache.size}\n• **Command count**: ${client.commands.size}\n• **Aliases count**: ${client.aliases.size}\n• **Used commands**: ${clientUser.usedCommands}\n• **Ping**: API: ${Math.floor(client.ws.ping)}ms / Bot: ${Math.round(latency)}ms\n• **Uptime**: ${converted.d} Days/${converted.h} Hours/${converted.m} Minutes`);
        m.edit({embeds: [embed]});
    });
};

exports.info = {
    description: 'Get some information about Shiroko'
};