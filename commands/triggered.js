const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("triggered")
    .setDescription("Get a triggered overlay on a user's avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user")
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  run: async (client, interaction, message) => {
    let user = interaction.options.getUser("user");

    if (!user) {
      user = interaction.user;
    }

    let avatarUrl = user.avatarURL({ size: 512, extension: "jpg" });
    let overlay = `https://some-random-api.ml/canvas/triggered?avatar=${avatarUrl}`;

    await interaction.reply({
      content: overlay,
    });
  },
};