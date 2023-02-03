const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("fake-tweet")
    .setDescription("Post a fake tweet")
    .addStringOption((option) =>
      option
        .setName("tweet")
        .setDescription("Enter your tweet")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  run: async (client, interaction, message) => {
    let tweet = interaction.options.getString("tweet");
    let avatarUrl = interaction.user.avatarURL({ extension: "jpg" });
    let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${
      interaction.user.username
    }&username=${interaction.user.username}&comment=${encodeURIComponent(
      tweet
    )}`;

    await interaction.reply({
      content: canvas,
    });
  },
};