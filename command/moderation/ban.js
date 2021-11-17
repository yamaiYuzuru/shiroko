let {Client, Message, MessageEmbed, MessageButton, MessageActionRow} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[] | Number[]} args
 */
exports.run = async (client, msg, args) => {
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);

    if (!member) return msg.reply('I can\'t find this member');
    if (!msg.member.permissions.has('BAN_MEMBERS')) return msg.reply('You don\'t have enough permissions to use this command');
    if (!member.bannable) return msg.reply('I can\'t ban this member');

    let banButton = new MessageButton().setStyle('SUCCESS').setLabel('BAN').setCustomId('cmd_ban_ban');
    let stopButton = new MessageButton().setStyle('SECONDARY').setLabel('Exit').setCustomId('cmd_ban_exit');
    let actionRow = new MessageActionRow({components: [banButton, stopButton]});

    let embed = new MessageEmbed();
    embed.setTitle('Ban');
    embed.setDescription(`Are you sure about to ban ${member.user.tag}?`);
    await msg.reply({embeds: [embed], components: [actionRow]}).then(async m => {
        let banFilter = (interaction) => interaction.customId === "cmd_ban_ban" && interaction.user.id === msg.author.id;
        let stopFilter = (interaction) => interaction.customId === "cmd_ban_exit" && interaction.user.id === msg.author.id;

        let ban = m.createMessageComponentCollector({filter: banFilter});
        let stop = m.createMessageComponentCollector({filter: stopFilter});
        if (!isNaN(args[1])) {
            ban.on('collect', async (i) => {
                let reason = args.slice(1).join(' ') || `Not provided | Banned by ${msg.author.tag}`;
                await member.ban({reason: reason}).then(async gm => {
                    let dmEmbed = new MessageEmbed();
                    dmEmbed.setTitle('Ban');
                    dmEmbed.setDescription(`You was banned from ${msg.guild.name} by ${msg.author.tag}`);
                    await gm.send({embeds: [dmEmbed]});
                    let banEmbed = new MessageEmbed();
                    banEmbed.setTitle('Ban');
                    banEmbed.setDescription(`${gm.user.tag} was banned by ${msg.author.tag}`);
                    await i.update({embeds: [banEmbed], components: []});
                });
            });

            stop.on('collect', async (i) => {
                let embed = new MessageEmbed();
                embed.setTitle('Exit');
                embed.setDescription('The process was exited');
                await i.update({embeds: [embed], components: []});
            });
        } else {
            ban.on('collect', async (i) => {
                let reason = args.slice(2).join(' ') || `Not provided | Banned by ${msg.author.tag}`;
                await member.ban({reason: reason, days: args[1]}).then(async gm => {
                    let dmEmbed = new MessageEmbed();
                    dmEmbed.setTitle('Ban');
                    dmEmbed.setDescription(`You was banned from ${msg.guild.name} by ${msg.author.tag} for ${args[1]} days`);
                    await gm.send({embeds: [dmEmbed]});
                    let banEmbed = new MessageEmbed();
                    banEmbed.setTitle('Ban');
                    banEmbed.setDescription(`${gm.user.tag} was banned by ${msg.author.tag}`);
                    await i.update({embeds: [banEmbed], components: []});
                });
            });

            stop.on('collect', async (i) => {
                let embed = new MessageEmbed();
                embed.setTitle('Exit');
                embed.setDescription('The process was exited');
                await i.update({embeds: [embed], components: []});
            });
        }
    });
};

exports.info = {
    description: "Ban an user",
    usage: "s$ban <@user/userID> [days] [reason] or s$ban <@user/userID> [reason]"
};