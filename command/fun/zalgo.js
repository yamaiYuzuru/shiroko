// eslint-disable-next-line no-unused-vars
let zalgo = require('to-zalgo');

module.exports = {
    run: async (client, msg, args) => {
        if (!args.join(' ')) {
            msg.channel.messages.fetch({limit: 2}, true, true).then(messages => {
                let message = messages.last();
                msg.channel.send(zalgo(message.cleanContent));
            })
        } else {
            await msg.channel.send(zalgo(args.join(' ')));
        }
    },
    info: {

    }
};