module.exports = (client, msg, query) => {
    msg.channel.send(client.getErrorEmbed('ERROR', `No results found on YouTube for ${query}!`));
};