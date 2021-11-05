const { Client } = require("discord.js");
const config = require("../config.json");

/**
 * @param {number} ms
 */
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  async execute(client) {
    console.log("Logged in as " + client.user.tag);
    require("../server").run(client);
    await sleep(500);
    client.user.reloadStatus = async function () {
      //No Sharding
      const guildSize = this.client.guilds.cache.size;
      
      //Sharding
      /*
      const guildSize = await this.client.shard.fetchClientValues(
        "guilds.cache.size"
      );
      */
      this.setPresence({
        activities: [
          {
            name: `${guildSize.reduce((a, b) => a + b)}サーバーに導入済み｜${
              config.prefix
            }help`,
            type: "PLAYING",
          },
        ],
        status: "online",
      });
    };
    client.user.setPresence({
      activities: [{ name: "再起動中...", type: "WATCHING" }],
      status: "dnd",
    });
    client.rebootFlg = 1;
    setTimeout(() => {
      client.user.setPresence({
        activities: [
          {
            name: `${client.guilds.cache.size}サーバーに導入済み｜${config.prefix}help`,
            type: "PLAYING",
          },
        ],
        status: "online",
      });
      client.rebootFlg = 0;
    }, 5000);
  },
};
