module.exports = {
    run: (client, msg) => {
        if (!msg.member.voice.channel) return msg.channel.send(client.getErrorEmbed('ERROR', "You must be in an voice channel to use this command"));
        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(client.getErrorEmbed('ERROR', "We are not in the same voice channel"));
        if (!client.player.getQueue(msg)) return msg.channel.send(client.getErrorEmbed('ERROR', `No songs currently playing!`));
        if (client.player.getQueue(msg).paused) return msg.channel.send(client.getErrorEmbed("ERROR", "The player is already paused!"));

        const success = client.player.pause(msg);
        if (success) msg.channel.send(`Song ${client.player.getQueue(msg).playing.title} paused!`);
    },
    info: {
        description: "Pause an song"
    }
};