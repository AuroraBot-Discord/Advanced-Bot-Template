const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");

const client = new Discord.Client({
  intents: Object.values(Intents.FLAGS),
  allowedMentions: { repliedUser: false, parse: ["roles", "users"] },
  partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
  restTimeOffset: 50,
});

client.rebootFlg = 0;

require("./helpers/extends");

const config = require("./config.json");

client.commands = new Discord.Collection();
client.slash = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync("./commands");

const slashCommandFolders = fs.readdirSync("./slash");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

for (const folder of slashCommandFolders) {
  const commandFiles = fs
    .readdirSync(`./slash/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./slash/${folder}/${file}`);
    client.slash.set(command.name, command);
  }
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.BOT_TOKEN);

process.on("uncaughtException", (e) => {
  console.log(e);
  client.channels
    .fetch(config.errorLog)
    .then((x) =>
      x.send(
        `\`\`\`js\n${require("util")
          .inspect(e)
          .slice(0, 1800)}\n\`\`\``
      )
    );
});
