const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("hyperlink")
    .setDescription("Attach a link to a string")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Enter the text")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("link").setDescription("Enter the link").setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  run: async (client, interaction, message) => {
    const content = interaction.options.getString("content");
    const link = interaction.options.getString("link");

    const conversion = discord.hyperlink(content, link);

    await interaction.reply({
      content: `${conversion}`,
    });
  },
};