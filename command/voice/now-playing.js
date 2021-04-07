module.exports = {
    run: async (client, msg) => {
        if(!client.player.isPlaying(msg)) return msg.channel.send(client.getErrorEmbed("ERROR", "No songs in the queue"));

        let track = await client.player.nowPlaying(msg);

        await msg.channel.send(client.getEmbed('Woah', `${track.name} by ${track.author} (Requested by: ${track.requestedBy.tag})\n\n${client.player.createProgressBar(msg, {timecodes: true})}`));
    },
    aliases: ["np"],
    info: {
        description: "Shows you the playing song"
    }
};