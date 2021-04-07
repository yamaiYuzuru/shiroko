'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 * @copyright ©yuzuru, 2021
 */
module.exports = {
    run: async (client, msg, args) => {
        if (!client.db.getDB().get('servers').find({serverid: msg.guild.id}).get('ticket.categoryID')) return msg.channel.send(client.getErrorEmbed('Oh no.', "I can't find the category id. \nPlease use s$setup-ticket --category <categoryid>"));
        if (!client.db.getDB().get('servers').find({serverid: msg.guild.id}).get('ticket.roleID')) return msg.channel.send(client.getErrorEmbed('Oh no.', "I can't find the role id. \nPlease use s$setup-ticket --role <roleid>"));
        let guild = client.guilds.cache.get(msg.guild.id);
        if (guild.channels.cache.find(channel => channel.name === `ticket-${msg.author.username}`)) {
            return msg.reply('you already have a ticket, please close your exsisting ticket first before opening a new one!');
        }

        guild.channels.create(`ticket-${msg.author.username}`, {
            type: 'text',
            parent: client.db.getDB().get('servers').find({serverid: msg.guild.id}).get('ticket.categoryID').value()
        }).then(async channel => {
            await channel.edit({
                permissionOverwrites: [
                    {
                        type: "member",
                        id: msg.author,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                    },
                    {
                        type: "role",
                        id: msg.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        type: "role",
                        id: guild.roles.cache.find(r => r.id === client.db.getDB().get('servers').find({serverid: msg.guild.id}).get('ticket.roleID').value()),
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    }
                ],
            });
            await msg.reply(`You have successfully created a ticket! Please click on ${channel} to view your ticket.`);
            client.channels.cache.get(channel.id).send(`<@!${msg.author.id}>, <@&${client.db.getDB().get('servers').find({serverid: msg.guild.id}).get('ticket.roleID')}>`, {embed: client.getEmbed('Hi', `${client.db.getDB().get('servers').find({serverid: msg.guild.id}).get('ticket.text').value() !== undefined || `Hi ${msg.author.tag}, welcome to your ticket! Please be patient, we will be with you shortly.`}\nReason: ${args.join(' ') || "Not given\n"}`)});
        }).catch(e => {msg.channel.send('Oh no an error\n```js\n' + e.toString() + "```")});

    },
    aliases: ["new", "create-ticket"],
    info: {
        description: "Open an ticket",
        usage: "s$create [Reason]"
    }
};