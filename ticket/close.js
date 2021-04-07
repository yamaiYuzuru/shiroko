'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 * @copyright ©yuzuru, 2021
 */

module.exports = {
    run: async (client, msg) => {
        if (!msg.channel.name.includes('ticket-')) return msg.channel.send(client.getErrorEmbed('Oh', 'The channel is not an ticket'));
        msg.channel.delete();
    },
    aliases: ["delete-ticket"],
    info: {
        description: "Close the ticket"
    }
};