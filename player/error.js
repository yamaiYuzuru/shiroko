module.exports = (client, error, msg, ...args) => {
    switch (error) {
        case 'NotPlaying':
            msg.channel.send(client.getErrorEmbed('ERROR', "The queue is empty because no songs."));
            break;
        case 'NotConnected':
            msg.channel.send(client.getErrorEmbed("ERROR", `You are not connected in any voice channel!`));
            break;
        case 'UnableToJoin':
            msg.channel.send(client.getErrorEmbed("ERROR", `I am not able to join your voice channel, please check my permissions!`));
            break;
        case 'VideoUnavailable':
            msg.channel.send(client.getErrorEmbed("ERROR", `${args[0].title} is not available in your country! Skipping...`));
            break;
        case 'MusicStarting':
            msg.channel.send(client.getErrorEmbed('ERROR', `The music is starting... please wait and retry!`));
            break;
        default:
            msg.channel.send(client.getErrorEmbed('ERROR', `Something went wrong... \nError: ${error}`));
    }
};
