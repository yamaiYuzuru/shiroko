module.exports = {
    run: async (client, msg) => {
        if(!msg.member.voice.channel) return msg.channel.send(client.getErrorEmbed('ERROR', "You must be in a voice channel"));
        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(client.getErrorEmbed('ERROR', "We are not in the same voice channel"));
        if(!client.player.isPlaying(msg.guild.id)) return msg.channel.send(client.getErrorEmbed("ERROR", "No songs in the queue"));
        await client.player.clearQueue(msg.guild.id);

        return msg.channel.send(client.getEmbed('OK!', "The queue is now cleared"));
    },
    aliases: ["cq"],
    info: {
        description: "Clear the queue"
    }
};