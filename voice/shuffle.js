module.exports = {
    run: async (client, msg) => {
        if (!msg.member.voice.channel) return msg.channel.send(`You're not in a voice channel !`);

        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(`You are not in the same voice channel !`);

        if (!client.player.getQueue(msg)) return msg.channel.send(`No music currently playing !`);

        const success = client.player.shuffle(msg);

        if (success) msg.channel.send(`Queue shuffled **${client.player.getQueue(msg).tracks.length}** song(s) !`);
    },
    info: {
        description: "Shuffle the queue"
    }
};