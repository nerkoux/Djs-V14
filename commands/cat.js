const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("cat")
    .setDescription("Get a image or an amazing fact about a cat")
    .addStringOption((option) =>
      option
        .setName("option")
        .setDescription("Choose an option")
        .addChoices(
          {
            name: "Image",
            value: "image",
          },
          {
            name: "Fact",
            value: "fact",
          }
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  run: async (client, interaction, message) => {
    const option = interaction.options.getString("option");

    const url = "https://some-random-api.ml/animal/cat";

    if (option === "image") {
      axios
        .get(url)
        .then(async (res) => {
          const embed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setTitle(`Cat Image for ${interaction.user.username}`)
            .setImage(`${res.data.image}`)
            .setFooter({
              text: "To get a cat fact use /cat [Fact] command",
            });

          const row = new discord.ActionRowBuilder().addComponents(
            new discord.ButtonBuilder()
              .setLabel("Image Link")
              .setStyle(discord.ButtonStyle.Link)
              .setURL(`${res.data.image}`)
          );

          await interaction.reply({
            embeds: [embed],
            components: [row],
          });
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    } else {
      axios
        .get(url)
        .then(async (res) => {
          await interaction.reply({
            content: `**${res.data.fact}**`,
          });
        })
        .catch(async (err) => {
          console.log(err);
          await interaction.reply({
            content: "There was an error while executing this command...",
            ephemeral: true,
          });
        });
    }
  },
};