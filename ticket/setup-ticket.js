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
        if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.channel.send(client.getErrorEmbed('No', "You don't have permissions to use this command"));
        if (!msg.guild.me.permissions.has('MANAGE_CHANNELS')) return msg.channel.send(client.getErrorEmbed('Oh no', "I need the permission MANAGE_CHANNELS for the ticket system"));
        if (!client.db.doesServerExists(msg.guild.id)) client.db.createServer(msg.guild.id);
        if (!args[0]) return msg.channel.send(client.getErrorEmbed('No', "You must enter --role or --category"));
        switch (args[0]) {
            case "--role":
                if (!args[1]) return msg.channel.send(client.getErrorEmbed("No", "You must enter an role."));
                // eslint-disable-next-line no-case-declarations
                const role = msg.guild.roles.cache.get(args[1]).id || msg.mentions.roles.first().id;
                client.db.setServer(msg.guild.id, "ticket.roleID", role);
                msg.channel.send(`The role id was set to ${role}`);
                break;
            case "--category":
                if (!args[1]) return msg.channel.send(client.getErrorEmbed("No", "You must enter an category id."));
                client.db.setServer(msg.guild.id, "ticket.categoryID", `${args[1]}`);
                msg.channel.send(`The category id was set to ${args[1]}`);
                break;
            case "--text":
                if (!args[1]) return msg.channel.send(client.getErrorEmbed("No", `You must provide an text`));
                client.db.setServer(msg.guild.id, "ticket.text", `${args.split(1).join(' ')}`);
                msg.channel.send(`The text was set to "${args.split(1).join(' ')}"`)
        }
    },
    info: {
        description: "Setup the ticket system",
        usage: "s$setup-ticket <--role|--category|--text>"
    }
};