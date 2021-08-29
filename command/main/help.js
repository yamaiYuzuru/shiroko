let {Client, Message, MessageEmbed} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    if (!args[0]) return msg.reply('Please s$commands instead of s$help to see the commands');
    let embed = new MessageEmbed();
    let cmd = client.commands.get(args[0].toLowerCase()) || client.aliases.get(args[0].toLowerCase());
    if(!cmd) return msg.reply({embeds: [embed.setDescription(`Can't find the command ${args[0]}.`)]});

    embed.setTitle(`s$${cmd.name}`);
    embed.setDescription(cmd.info.description || "No description provided.");
    embed.addField("Usage", `\`${cmd.info.usage || `s$${cmd.name}`}\``);
    embed.setFooter(`Requested by ${msg.author.tag} | [] => must not, <> => must`, msg.author.avatarURL());
    if(cmd.info.aliases) embed.addField("Aliases", `${cmd.info.aliases.join(', ')}`);
    return msg.reply({embeds: [embed]});
};

exports.info = {
    description: "Get some information about an command"
};