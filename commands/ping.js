const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's latency!"),
  
    run: async (client, interaction) => {
      interaction.reply(`Pong 🏓`)
    }
 };