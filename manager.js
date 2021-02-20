const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./main.js', {token:"Your "});
module.exports.start = () => {
    manager.spawn("auto", 15000, 10000000).catch(e => console.error(e));
    manager.on("shardCreate", (shard) => console.log(`Launching Shard ${shard.id}`));
};
