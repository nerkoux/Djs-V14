const { InteractionType } = require("discord.js");

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
   	 if (interaction.type == InteractionType.ApplicationCommand) {
   	 if(interaction.user.bot) return;
	try {
         const command = client.commands.get(interaction.commandName)
         command.run(client, interaction)
	} catch {
	interaction.reply({content: "Problem occured while executing this command , Please try to fix it or contact the owner", ephemeral: true})
	}
	 }
  }}