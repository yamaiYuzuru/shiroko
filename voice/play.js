module.exports = {
    aliases: ['p'],
    run: async (client, msg, args) => {
        if (!msg.member.voice.channel) return msg.channel.send(client.getErrorEmbed('ERROR', "You must be in an voice channel to use this command"));
        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(client.getErrorEmbed('ERROR', "We are not in the same voice channel"));
        // if (!client.player.getQueue(msg)) return msg.channel.send(client.getErrorEmbed('ERROR', `No songs currently playing!`));

        if (!args[0]) return msg.channel.send(`Please indicate the title of a song!`);

        await client.player.play(msg, args.join(" "), true);
    },
    info: {
        description: "Play a song"
    }
};