let {Client, Collection, Intents} = require('discord.js');
let fs = require('fs');
let mongoose = require('mongoose');

let {GUILDS, GUILD_MESSAGES, GUILD_MEMBERS, GUILD_MESSAGE_REACTIONS, DIRECT_MESSAGES, DIRECT_MESSAGE_REACTIONS} = Intents.FLAGS;
let intents = [GUILDS, GUILD_MEMBERS, GUILD_MESSAGE_REACTIONS, GUILD_MESSAGES, DIRECT_MESSAGES, DIRECT_MESSAGE_REACTIONS];

let client = new Client({intents: intents, allowedMentions: {repliedUser: false}});

let commands = (client.commands = new Collection());
let aliases = (client.aliases = new Collection());
let config = (client.config = require('./configs'));
let {Api} = require('@top-gg/sdk');
let DBL = new Api(config.dbl_token);

client.modules = {
    dbl: DBL,
    version: require('./package.json').version
};

fs.readdir('./events', (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        client.on(file.split('.')[0], require(`./events/${file}`).bind(null, client));
    });
    console.log(`[EventHandler] ${files.filter(f=>f.endsWith('.js')).length} Events are loaded.`);
});

fs.readdir('./command', (err, folders) => {
    if (err) return console.log(err);
    folders.forEach(folder => {
        fs.readdir(`./command/${folder}`, (err1, files) => {
            if (err1) return console.log(err1);
            files.forEach(file => {
                if (!file.endsWith('.js')) return;
                let cmd = require(`./command/${folder}/${file}`);

                if (!cmd.info) cmd.info = {};

                cmd.info.category = folder;
                cmd.info.name = file.split('.')[0];

                commands.set(cmd.info.name, cmd);
                if (cmd.info.aliases) cmd.info.aliases.forEach(a=>aliases.set(a, cmd));
            });
            console.log(`[CommandHandler] Category ${folder} was loaded with ${files.filter(f=>f.endsWith('.js')).length} commands`)
        });
    });
});

(async () => {
    await mongoose.connect(config.mongoDB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(()=>console.log('[Database] MongoDB successful connected')).catch(e=>console.error(e));
})();
client.login(config.token).then(() => console.log(`[Client] Successful login as ${client.user.tag}`)).catch(e=>console.error(e));