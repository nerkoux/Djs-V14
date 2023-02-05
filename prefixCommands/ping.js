const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ms = require("ms");

module.exports = {
  name: "ping",
  description: "Ping of the bot",
    run: async (client, message, args) => {
      message.reply({
        content : "Pong !!"
      })
    }
 };