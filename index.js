// No Sharding
require("./bot.js");

//Sharding
/*
const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./bot.js", { token: process.env.BOT_TOKEN });

manager.on("shardCreate", (shard) =>
  console.log(`Launched shard ${shard.id}`)
);

manager.spawn();
*/
