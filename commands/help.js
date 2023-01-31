const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Lists all available commands'),
    showHelp: false,

    run: async (client, interaction, message) => {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('This code comes from a GitHub project [Nerkoux/Djs-V14](https://github.com/nerkoux/Djs-V14).\nThe use of this one is possible while keeping the credits for free.\nIf you want to remove the credits join the Discord support server.')
        .addFields([ { name: `Enabled - ${commands.size}`, value: commands.map(x => `\`${x.data.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'DJS V14 by Vex[R] ❤️', iconURL: interaction.member.avatarURL({ dynamic: true })});

        interaction.reply({ embeds: [embed] });
    },
};