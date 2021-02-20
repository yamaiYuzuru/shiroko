'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 */
const {MessageEmbed} = require('discord.js');

module.exports = {
    run: async (client, msg, args) => {

        let embed = new MessageEmbed();
        embed.setTimestamp(Date.now());
        if(args[0]) {
            let cmd = client.cmds.get(args[0].toLowerCase()) || client.aliases.get(args[0].toLowerCase());
            if(!cmd) return msg.channel.send(embed.setDescription(`Can't find the command ${args[0]}.`));

            embed.setTitle(`s$${cmd.name}`);
            embed.setDescription(cmd.info.description || "No description provided.");
            embed.addField("Usage", `\`${cmd.info.usage || `s$${cmd.name}`}\``);
            embed.setFooter(`Requested by ${msg.author.tag} | [] => must not, <> => must`, msg.author.avatarURL());
            if(cmd.aliases) embed.addField("Aliases", `${cmd.aliases.join(', ')}`);
            return msg.channel.send(embed);
        }

        let kategorien = [];
        client.cmds.sort();
        client.cmds.map(cmd=>{
            if(hidden_categories.some(c=>cmd.kategorie===c)) return;
            if (cmd.kategorie === "nsfw" && !msg.channel.nsfw) return;
            if(!kategorien.find(k=>k.name===cmd.kategorie))
                kategorien.push({ name: cmd.kategorie, content: [] });

            kategorien.find(k=>k.name===cmd.kategorie)["content"].push(cmd.info);
        });

        kategorien.map(kategorie=>{
            embed.addField(`${upperCaseFirst(kategorie.name)} (${kategorie.content.length})`, kategorie["content"].map(c=>`\`${c.name}\``).join(', '))
        });

        embed.setColor('BLUE');
        embed.setFooter("Requested by " + msg.author.tag + " | For more help: s$help (command)", msg.author.avatarURL());

        await msg.channel.send(embed).catch(e => console.error(e));
    },
    aliases: ["h"],
    info: {
        description: "View all commands or see all information about an command",
        usage: "s$help [Command]",
    }
};

function upperCaseFirst(string) {
    const array = string.split("");
    array[0] = array[0].toUpperCase();
    return array.join('');
}
let hidden_categories = ["admin"];