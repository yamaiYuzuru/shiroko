module.exports = {
    run: async (client, msg, args) => {
        try {
            await msg.channel.send(eval(args.join(' ')));
        } catch (e) {
            await msg.channel.send(e.toString());
        }
    },
    info: {
        description: "Evaluate some codes [BOT ADMINS ONLY]",
        usage: "s$eval <code>"
    }
};