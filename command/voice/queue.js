let {MessageEmbed} = require('discord.js');
module.exports = {
    run: async (client, msg) => {
        if (!msg.member.voice.channel) return msg.channel.send(client.getErrorEmbed('ERROR', "You must be in an voice channel to use this command"));
        if (msg.guild.me.voice.channel && msg.member.voice.channel.id !== msg.guild.me.voice.channel.id) return msg.channel.send(client.getErrorEmbed('ERROR', "We are not in the same voice channel"));
        if (!client.player.getQueue(msg)) return msg.channel.send(client.getErrorEmbed('ERROR', `No songs currently playing!`));
        const queue = client.player.getQueue(msg);
        let embed = new MessageEmbed();
        embed.setTitle(`Queue for ${msg.guild.name}`);
        embed.setColor('RANDOM');
        embed.addField('Now Playing', `[${queue.playing.title}](${queue.playing.url}) | ` + "\`" + queue.playing.duration + `, requested by ${queue.playing.requestedBy.username} (${queue.playing.requestedBy.tag})\``);
        embed.addField("Up Next", queue.tracks.map((track, i) => {
            return `\`${i + 1}. ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})\``
        }).slice(0, 5).join('\n') + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length - 5}** other songs...` : `In the queue **${queue.tracks.length}** song(s)...`}`);
        embed.setFooter(`Loop: ${client.player.getQueue(msg).repeatMode ? "✔" : "❌"} | Queue Loop: ${client.player.getQueue(msg).loopMode ? '✔' : '❌'}`, msg.author.avatarURL());
        embed.setTimestamp(Date.now());
    },
    info: {
        description: "Shows you all songs in the queue"
    }
};