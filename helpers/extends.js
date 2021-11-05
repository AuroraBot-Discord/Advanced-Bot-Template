const {
  Message,
  MessageEmbed,
  Guild,
  CommandInteraction,
  MessageComponentInteraction,
  User,
  Client,
  BaseGuildTextChannel,
} = require("discord.js");
const config = require("../config.json");

/**
 *
 * @param {string} emoji
 * @param {string} title
 * @param {string} msg
 * @param {string | undefined} color
 * @param {boolean | undefined} replied
 */
Message.prototype.sendEmbedEmoji = function (
  emoji,
  title,
  msg,
  color = "RANDOM",
  replied
) {
  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(`${emoji}${msg}`)
    .setColor(color);
  if (replied) {
    return this.reply({ embeds: [embed] });
  } else {
    return this.channel.send({ embeds: [embed] });
  }
};

/**
 *
 * @param {string} title
 * @param {string} msg
 */
Message.prototype.error = function (title, msg) {
  return this.sendEmbedEmoji("❌", title, msg, 0xff3300);
};

/**
 *
 * @param {string} title
 * @param {string} msg
 */
Message.prototype.ok = function (title, msg) {
  return this.sendEmbedEmoji("✅", title, msg, 0x0ffc23);
};

Guild.prototype.owner = function () {
  return this.members.cache.get(this.ownerId);
};

CommandInteraction.prototype.error = function (title, msg, deferred) {
  if (!deferred)
    return this.reply({
      embeds: [
        {
          title: `${title}`,
          description: `❌${msg}`,
          color: 0xff3300,
        },
      ],
      ephemeral: true,
      fetchReply: true,
    });
  return this.followUp({
    embeds: [
      {
        title: `${title}`,
        description: `❌${msg}`,
        color: 0xff3300,
      },
    ],
    ephemeral: true,
    fetchReply: true,
  });
};

CommandInteraction.prototype.ok = function (title, msg, deferred) {
  if (!deferred)
    return this.reply({
      embeds: [
        {
          title: `${title}`,
          description: `✅${msg}`,
          color: 0x0ffc23,
        },
      ],
      fetchReply: true,
    });
  return this.followUp({
    embeds: [
      {
        title: `${title}`,
        description: `✅${msg}`,
        color: 0x0ffc23,
      },
    ],
    fetchReply: true,
  });
};

MessageComponentInteraction.prototype.errorUpdate = function (title, msg) {
  return this.update({
    embeds: [
      {
        title: title,
        description: `:x:${msg}`,
        color: 0xff3300,
      },
    ],
    components: [],
  });
};

CommandInteraction.prototype.errorUpdate = function (title, msg) {
  return this.editReply({
    embeds: [
      {
        title: title,
        description: `:x:${msg}`,
        color: 0xff3300,
      },
    ],
  });
};

User.prototype.url = function () {
  return `https://discord.com/users/${this.id}`;
};
