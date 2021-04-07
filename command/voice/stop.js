module.exports = {
    aliases: ['dc'],

    run: async (client, msg) => {
        if (!msg.member.voice.channel) return msg.channel.send(client.getErrorEmbed('ERROR', "You must be in an voice channel to use this command"));
        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(client.getErrorEmbed('ERROR', "We are not in the same voice channel"));
        if (!client.player.getQueue(msg)) return msg.channel.send(client.getErrorEmbed('ERROR', `No songs currently playing!`));

        client.player.setRepeatMode(msg, false);
        const success = client.player.stop(msg);

        if (success) msg.channel.send(client.getEmbed('OK!', `Music **stopped** into this server!`));
    },
};