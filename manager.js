const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./main.js', {token:"T8h5I7s5d4d846_8I2s7N0o7td894.A1n_6B03o62t5.T5o4k8e21nds8_.5a984dd87s4518af"});
module.exports.start = () => {
    manager.spawn("auto", 15000, 10000000).catch(e => console.error(e));
    manager.on("shardCreate", (shard) => console.log(`Launching Shard ${shard.id}`));
};