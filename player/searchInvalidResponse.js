module.exports = (client, msg, query, tracks, content, collector) => {
    if (content === 'cancel') {
        collector.stop();
        return msg.channel.send(client.getEmbed("OK!", `The selection has been **cancelled**!`));
    } else msg.channel.send(client.getErrorEmbed('ERROR', `You must send a valid number between **1** and **${tracks.length}**!`));
};