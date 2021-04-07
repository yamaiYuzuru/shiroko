module.exports = {
    run: async (client, msg) => {
        if (client.player.getQueue(message).loopMode) {
            client.player.setLoopMode(message, false);
            return msg.channel.send(client.getEmbed('OK!',`Repeat mode **disabled**!`));
        } else {
            client.player.setLoopMode(message, true);
            return message.channel.send(client.getEmbed('OK!', `Repeat mode **enabled** the whole queue will be repeated endlessly!`));
        }
    },
    aliases: ["loopq", "lq"],
    info: {
        description: "Loop the queue endless"
    }
};