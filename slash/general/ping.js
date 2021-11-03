const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "ping",
  description: "BotのPing値を測ります。",
  category: "一般",
  /**
   *
   * @param {CommandInteraction} i
   */
  execute(i) {
    i.reply({ content: ":ping_pong:Pinging...", fetchReply: true }).then(
      (msg) =>
        msg.edit({
          content: null,
          embeds: [
            {
              title: ":ping_pong:Ping!",
              description: "只今のPing値は...",
              color: "RANDOM",
              fields: [
                {
                  name: "🚅WebSocket Ping",
                  value: `${i.client.ws.ping}ms`,
                  inline: true,
                },
                {
                  name: "🚌API Latency",
                  value: `${Date.now() - msg.createdTimestamp}ms`,
                  inline: true,
                },
              ],
            },
          ],
        })
    );
  },
};
