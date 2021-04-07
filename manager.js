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
        token: "ODAzMzg3MzI4Mjk0MDI3MjY0.YA9CwQ.24VkGwAfd8ZCfbfPUYbQORonVrI"});

    manager.on("shardCreate", async (shard) => {
        console.log(`[Shards] A shard with the id ${shard.id} was launched`);
    });
};