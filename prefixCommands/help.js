const config = require("../configuration.js");
let emoji = config.emoji

const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: "Shows the Legacy commands",
  run: async (client, message) => {
    
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setTitle('Commands')
          .setDescription(client.commands.map(command => `\`${command.data.name}\``).join(', '))
          .setColor('BLURPLE')
      ]
    })
  }
}
