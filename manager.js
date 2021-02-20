const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./main.js', {token:"ODAzMzg3MzI4Mjk0MDI3MjY0.YA9CwQ.dp9vYCM8TPx1iVz_r16TLxbfic0"});
module.exports.start = () => {
    manager.spawn("auto", 15000, 10000000).catch(e => console.error(e));
    manager.on("shardCreate", (shard) => console.log(`Launching Shard ${shard.id}`));
};