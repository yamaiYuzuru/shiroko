let {MessageEmbed} = require('discord.js');
let booru = require('booru');

module.exports = {
    run: async (client, msg, args) => {
        let embed = new MessageEmbed();
        embed.setTimestamp(Date.now());

        if (!msg.mentions.users.first() || !msg.members.cache.find(u => u.name.includes(args[0])))
            return msg.channel.send(client.getErrorEmbed("Error", "Please mention an user or write the name from the user"));
        let user = msg.mentions.users.first() || msg.guild.members.cache.find(u => u.name.includes(args[0]));
        if (!args[1]) {
            embed.setDescription(`**${msg.author.username}** fucks **${user.username}**`);
            booru.search("danbooru", ["yuri", "sex"], {limit: 1, random: true}).then(booru.commonfy).then(posts => {
                for (let post of posts) {
                    if (post.file_url.endsWith('.mp4')) return true;
                    embed.setImage(post.file_url);
                    msg.channel.send(embed)
                }
            });
        } else {
            let args2 = args.slice(1);
            embed.setDescription(`**${msg.author.username}** fucks **${user.username}**\n\n> ${args2.join(' ')}`);
            booru.search("danbooru", ["yuri", "sex"], {limit: 1, random: true}).then(booru.commonfy).then(posts => {
                for (let post of posts) {
                    if (post.file_url.endsWith('.mp4')) return true;
                    embed.setImage(post.file_url);
                    msg.channel.send(embed)
                }
            });
        }
    },
    info: {
        description: "Fuck an user"
    }
};