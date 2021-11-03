const { Client } = require("discord.js");
const http = require("http");

module.exports = {
  /**
   *
   * @param {Client} client
   */
  run: function (client) {
    http.createServer((req, res) => {
      res.write(`Logged in as ${client.user.tag}!`);
      res.end();
    }).listen(8080);
  }
};
