'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 * @copyright ©yuzuru, 2021
 */
// eslint-disable-next-line no-unused-vars
const {Client, Collection, MessageEmbed, StringResolvable} = require('discord.js');
const fs = require('fs');
// const sqlite = require('sqlite');
const Console = require('./function/ShirokoConsole');
let Player = require('discord-player');
let config = require('./config.json');
let topgg = require('@top-gg/sdk');
// eslint-disable-next-line no-unused-vars
let topgg_api = new topgg.Api(config.top_gg);
let poster = require('topgg-autoposter');
let db = require('./function/db.js');
let manager = require('./manager.js');

/**
 * @const client {Client}
 */
const client = new Client({disableMentions: "everyone"});
/**
 * @const cmds {Collection}
 * @const aliases {Collection}
 * @const c {Console}
 */
const cmds = client.cmds = new Collection();
const aliases = client.aliases = new Collection();
const c = client.console = new Console(client);
client.db = db;
client.player = new Player.Player(client, {quality: "high", leaveOnEmpty: true});

fs.readdir('./events', (err, files) => {
    files.forEach(file =>{
        if (!file.endsWith('.js')) return true;
        client.on(file.split('.')[0], require(`./events/${file}`).bind(null, client));
    });
    console.info(`[EventHandler] It was ${files.length} events loaded`)
});

fs.readdir('./player', (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return true;
        client.player.on(file.split('.')[0], require(`./player/${file}`).bind(null, client));
    });
    console.log(`[PlayerEventsHandler] It was ${files.length} player-events loaded`)
});

fs.readdir("./command", (err, cat) => {
    if (err) return console.log(err);
    cat.forEach(folder => {
        if (err) return console.log(err);
        fs.readdir(`./command/${folder}`, (err, files) => {
            files.forEach(file => {
                if (!file.endsWith(".js"))
                    return new Error(`There is an wrong file in ./command/${folder}`);
                const cmd = require(`./command/${folder}/${file}`);

                if (!cmd.info)
                    return new TypeError(
                        `${file} module.exports.info is missing.`
                    );
                cmd.kategorie = folder;
                cmd.info.name = file.split(".")[0];

                cmds.set(cmd.info.name, cmd);
                if (cmd.aliases)
                    cmd.aliases.forEach(a => aliases.set(a, cmd));

            });
            c.info(`[CommandHandler] The category ${folder} was loaded with ${files.length} commands`)
        });
    });
});

/*
sqlite.open("./db/shiroko.sqlite").then((r) => {
    console.info('Database Shiroko was loaded.');
    client.sql = r;
}).catch(e => console.error(e));*/

client.login(`ODEyMzM2ODc1ODI5NzIzMjQ3.YC_Rqw._4lzem7k2ejAvvGYQlOiUW5IWJU`).then(() => {
    c.info('Logged in as ' +  client.user.tag);
}).catch((e) => c.error(e));

client.on('ready', async () => {
    c.info(`Online as ${client.user.tag}`);
    setInterval(() => {
        setPresence(client);
    }, 10e3);
    //client.channels.cache.get('811238806153986100').setName(`Shiroko-Guild Count: ${client.guilds.cache.size}`);
    // await poster(config.top_gg, client);
});

/**
 * @function setPresence {Client}
 **/
// eslint-disable-next-line no-unused-vars
async function setPresence(client) {
    const statuses = [
        `on ${client.guilds.cache.size} Servers OwO|||PLAYING`,
        "Anime openings on Spotify|||LISTENING",
        "Crunchyroll|||WATCHING",
        `with ${client.cmds.size} Commands|||PLAYING`,
        `with ${client.users.cache.size} Users UwU|||PLAYING`
    ];
    const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
    const type = statuses[index].split('|||')[1];
    const name = statuses[index].split("|||")[0];
    await client.user.setPresence({
        activity: {
            name: name + ' | s$help',
            type: type
        }, status: "idle"
    });
}
//manager().then(() => {
//     console.log('[Shards] Manager was loaded')
//});
// Constructor or others
/*function getBot() {
    return client;
}

module.exports = {
    getBot
};*/

client.getSettings = () => {
    return config;
};
/**
 * @param title {StringResolvable | string}
 * @param description {StringResolvable | string}
**/
client.getErrorEmbed = (title, description) => {
    return new MessageEmbed().setTitle(title).setDescription(description).setColor('RED').setTimestamp(Date.now());
};
/**
 * @param title {StringResolvable | string}
 * @param description {StringResolvable | string}
**/
client.getEmbed = (title, description) => {
    return new MessageEmbed().setTitle(title).setDescription(description).setColor('GREEN').setTimestamp(Date.now());
};
/**
 * @param title {StringResolvable | string}
 * @param description {StringResolvable | string}
**/
client.getWarnEmbed = (title, description) => {
    return new MessageEmbed().setTitle(title).setDescription(description).setColor('YELLOW').setTimestamp(Date.now());
};