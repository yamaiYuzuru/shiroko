let {ShardingManager} = require('discord.js');
let {token} = require('./configs');
let shard = new ShardingManager('./main.js', {
    mode: "process",
    token: token,
    totalShards: 'auto',
    respawn: true,
    shardList: "auto"
});

(async () => {
    await shard.spawn({amount: "auto"}).then(()=>console.log('[Shard] SharingManager was successful started'));
    shard.shards.forEach(shard => {
        if (shard.id === 0) shard.kill()
    });
})();