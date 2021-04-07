module.exports = (client, msg, query, tracks) => {
    msg.channel.send(client.getEmbed(`Search results for ${query}`, `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`))
};