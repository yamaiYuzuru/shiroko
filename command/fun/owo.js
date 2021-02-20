'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
let owo = require('@zuzak/owo');

module.exports = {
    run: async (client, msg, args) => {
        if (!args.join(' ')) {
            msg.channel.messages.fetch({limit: 2}, true, true).then(messages => {
                let message = messages.last();
                msg.channel.send(owo(message.cleanContent));
            })
        } else {
            await msg.channel.send(owo(args.join(' ')));
        }
    },
    info: {
        description: "OwOfying some texts",
        usage: "s$owo [text]"
    }
};