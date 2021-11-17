let {Client, Message, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if (!member) return msg.reply('I can\'t find this member');
    if (!msg.member.permissions.has('KICK_MEMBERS')) return msg.reply('You don\'t have enough permissions to use this command');
    if (!member.kickable) return msg.reply('I can\'t kick this member');

    let kickButton = new MessageButton().setStyle('SUCCESS').setLabel('Kick').setCustomId('cmd_kick_kick');
    let stopButton = new MessageButton().setStyle('SECONDARY').setLabel('Exit').setCustomId('cmd_kick_exit');
    let actionRow = new MessageActionRow({components: [kickButton, stopButton]});

    let embed = new MessageEmbed();
    embed.setTitle('Kick');
    embed.setDescription(`Are you sure about to kick ${member.user.tag}?`);
    await msg.reply({embeds: [embed], components: [actionRow]}).then(async m => {
        let banFilter = (interaction) => interaction.customId === "cmd_kick_kick" && interaction.user.id === msg.author.id;
        let stopFilter = (interaction) => interaction.customId === "cmd_kick_exit" && interaction.user.id === msg.author.id;

        let kick = m.createMessageComponentCollector({filter: banFilter});
        let stop = m.createMessageComponentCollector({filter: stopFilter});
        kick.on('collect', async (i) => {
            let reason = args.slice(1).join(' ') || `Not provided | Kicked by ${msg.author.tag}`;
            await member.kick(reason).then(async gm => {
                let dmEmbed = new MessageEmbed();
                dmEmbed.setTitle('Kick');
                dmEmbed.setDescription(`You was kicked from ${msg.guild.name} by ${msg.author.tag}`);
                await gm.send({embeds: [dmEmbed]});
                let banEmbed = new MessageEmbed();
                banEmbed.setTitle('Kick');
                banEmbed.setDescription(`${gm.user.tag} was kicked by ${msg.author.tag}`);
                await i.update({embeds: [banEmbed], components: []});
            });
        });

        stop.on('collect', async (i) => {
            let embed = new MessageEmbed();
            embed.setTitle('Exit');
            embed.setDescription('The process was exited');
            await i.update({embeds: [embed], components: []});
        });
    });
};

exports.info = {
    description: "Ban an user",
    usage: "s$kick <@user/userID> [reason]"
};