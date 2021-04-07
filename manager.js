'use strict';
/**
 * @author yuzuru
 * @name Shiroko
 * @license MIT
 * @github https://github.com/yamaiYuzuru
 * @copyright ©yuzuru, 2021
 */
let {ShardingManager} = require('discord.js');
module.exports = async () => {
    let manager = new ShardingManager('./main.js', {totalShards: "auto",
        shardList: "auto", mode: "process", respawn: true,
        token: "YOUR_TOKEN"});

    manager.on("shardCreate", async (shard) => {
        console.log(`[Shards] A shard with the id ${shard.id} was launched`);
    });
};
