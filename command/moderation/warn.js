let {Client, Message, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');
let {moderationSchema} = require('../../models');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if (!msg.member.permissions.has('KICK_MEMBERS')) return msg.reply('You don\'t have enough permissions to use this command');

    if (!member) return msg.reply('I can\'t find this member.');

    let user = await moderationSchema.findOne({userID: member.user.id});

    let warnData = {
        moderator: msg.author.id,
        reason: args.slice(1).join(' ') || "Not provided",
        date: Date.now()
    };

    let warnButton = new MessageButton().setStyle('SUCCESS').setCustomId('cmd_warn_warn').setLabel('Warn');
    let exitButton = new MessageButton().setStyle('SECONDARY').setCustomId('cmd_warn_exit').setLabel('Exit');
    let actionRow = new MessageActionRow({components: [warnButton, exitButton]});

    let embed = new MessageEmbed();
    embed.setTitle('Warn');
    embed.setDescription(`Are you sure to warn ${member.user.tag}?`);
    await msg.reply({embeds: [embed], components: [actionRow]}).then(async (m) => {
        let warnFilter = (interaction) => interaction.customId === "cmd_warn_warn" && interaction.user.id === msg.author.id;
        let exitFilter = (interaction) => interaction.customId === "cmd_warn_exit" && interaction.user.id === msg.author.id;

        let warn = m.createMessageComponentCollector({filter: warnFilter});
        let exit = m.createMessageComponentCollector({filter: exitFilter});

        warn.on('collect', async (i) => {
            user.warnings.push(warnData);
            await user.save();
            embed = new MessageEmbed();
            embed.setTitle('Warn');
            embed.setDescription(`${member.user.tag} was warned by ${msg.author.tag}\n\`\`\`Reason: ${args.slice(1).join(' ') || "Not provided"}\`\`\``);
            await i.update({embeds: [embed], components: []})
        });
        exit.on('collect', async (i) => {
            embed = new MessageEmbed();
            embed.setTitle('Exit');
            embed.setDescription('The process was exited');
            await i.update({embeds: [embed], components: []});
        });
    });
};

exports.info = {
    description: "Warn an user",
    usage: "s$warn <@user/userID> [reason]"
};
