module.exports = (client, message, queue) => {
    message.channel.send(client.getWarnEmbed("Oh!", `Music stopped as there is no more music in the queue!`));
};