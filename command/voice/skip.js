module.exports = {
    aliases: ['s'],
    execute(client, msg) {
        if (!msg.member.voice.channel) return msg.channel.send(client.getErrorEmbed('ERROR', "You must be in an voice channel to use this command"));
        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(client.getErrorEmbed('ERROR', "We are not in the same voice channel"));
        if (!client.player.getQueue(msg)) return msg.channel.send(client.getErrorEmbed('ERROR', `No songs currently playing!`));

        const success = client.player.skip(msg);

        if (success) msg.channel.send(client.getErrorEmbed("OK!", `The current song has been **skipped**!`));
    },
    info: {
        description: "Skip the current song"
    }
};