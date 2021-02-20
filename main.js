'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 * @copyright ©yuzuru, 2021
 */
const {Client, Collection} = require('discord.js');
const fs = require('fs');
const sqlite = require('sqlite');
const Console = require('./function/ShirokoConsole');

/**
 * @param client {Client}
 */
const client = new Client({shards: "auto", shardCount: 1, disableMentions: "everyone", fetchAllMembers: true});
/**
 * @param cmds {Collection}
 * @param aliases {Collection}
 * @param c {Console}
 */
const cmds = client.cmds = new Collection();
const aliases = client.aliases = new Collection();
const c = client.console = new Console(client);

fs.readdir('./events', (err, files) => {
    files.forEach(file =>{
        if (!file.endsWith('.js')) return true;
        client.on(file.split('.')[0], require(`./events/${file}`).bind(null, client));
        console.info(`[EventHandler] It was ${files.length} events loaded`)
    });
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

sqlite.open("./db/shiroko.sqlite").then((r) => {
    console.info('Database Shiroko was loaded.');
    client.sql = r;
}).catch(e => console.error(e));

client.login('T8h5I7s5d4d846_8I2s7N0o7td894.A1n_6B03o62t5.T5o4k8e21nds8_.5a984dd87s4518af').then(() => {
    c.info('Logged in as ' +  client.user.tag);
}).catch((e) => c.error(e));

client.on('ready', async () => {
    c.info(`Online as ${client.user.tag}`);
    setInterval(() => {
        setPresence(client);
    }, 10e3);
    client.channels.cache.get('811238806153986100').setName(`Shiroko-Guild Count: ${client.guilds.cache.size}`)
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
    })
}

module.exports.getBot = () => {
    return client;
};