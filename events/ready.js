let {Client} = require('discord.js');
let {shirokoSchema} = require('../models');

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    let clientUser = await shirokoSchema.findOne({clientID: client.user.id});

    if (!clientUser) {
        let newUser = await shirokoSchema.create({
            clientID: client.user.id
        });

        await newUser.save();
    }
    await setPresence(client);

    console.log(`Online as ${client.user.tag}`)
};

/**
 * @param {Client} client
 * @returns {Promise<Presence>}
 */
async function setPresence(client) {
    const statuses = [
        `on ${client.guilds.cache.size} Servers OwO|||PLAYING`,
        "Anime openings on Spotify|||LISTENING",
        "Crunchyroll|||WATCHING",
        `with ${client.commands.size} Commands|||PLAYING`,
        `with ${client.users.cache.size} Users UwU|||PLAYING`
    ];

    const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
    const type = statuses[index].split('|||')[1];
    const name = statuses[index].split("|||")[0];

    return client.user.setPresence({
        activities: [{
            name: name,
            type: type
        }],
        status: "idle"
    })
}