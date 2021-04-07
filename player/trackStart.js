module.exports = (client, msg, track) => {
    msg.channel.send(client.getEmbed(`Let's go!`, `Start playing ${track.name} requested by \`${track.requestedBy}\``));
};