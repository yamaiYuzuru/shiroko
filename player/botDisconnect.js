module.exports = (client, msg) => {
    msg.channel.send(client.getWarnEmbed("Oh oh", "I disconnect the voice channel"));
};