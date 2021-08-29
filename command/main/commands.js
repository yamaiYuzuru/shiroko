let {Client, Message, MessageEmbed} = require('discord.js');

/**
 * @param {Client} client
 * @param {Message} msg
 * @param {String[]} args
 */
exports.run = async (client, msg, args) => {
    let longstring = "";
    const embed = new MessageEmbed().setColor("13584").setTimestamp(new Date());
    if(args.length > 0){
        client.commands.map(function(cmd){
            if(cmd.info.category === args.join(' ').toLowerCase()) longstring += "`"+`${cmd.info.name}`+"`"+ ` - ${cmd.info.description}\n`
        });
        let size = longstring.split('\n').length-1;
        if(longstring !== "") embed.addField("💾 "+size+" commands for "+args.join(' '), longstring);
        if(longstring === "") embed.setTitle("Commands.")
            .setDescription(`For category \`${args.join(' ').toLowerCase()}\` was no command results.`)
    }
    if(args.length < 1){
        require('../../categories.json').map((category) => {
            embed.addField(category.displayName, "s$commands "+category.name)
        });
        embed.setTitle("All categories")
    }
    await msg.reply({embeds: [embed]})
};

exports.info = {
    description: 'View all category with the commands in there',
    aliases: ["cmds"]
};