'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const uwu = require('uwufy');

module.exports = {
    run: async (client, msg, args) => {
        if (!args.join(' ')) {
            msg.channel.messages.fetch({limit: 2}, true, true).then(messages => {
                let message = messages.last();
                msg.channel.send(uwu(message.cleanContent));
            })
        } else {
            await msg.channel.send(uwu(args.join(' ')));
        }
    },
    info: {
        description: "UwUfying some texts"
    }
};