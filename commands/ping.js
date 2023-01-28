const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's latency!"),
  
    run: async (client, interaction, message) => {
      interaction.reply(`Pong! API Latency is ${Math.round(client.ws.ping)}ms 🛰️, Last heartbeat calculated ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`)
    }
 };