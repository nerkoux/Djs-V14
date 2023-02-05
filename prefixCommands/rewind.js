const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'rewind',
  description: "Rewinds the music with the time you want",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    if (!args[0]) {
      return message.channel.send(`${emoji.error} | Please provide time (in seconds) to go rewind!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${emoji.error} | Please enter a valid number!`)
    queue.seek((queue.currentTime - time))
    message.channel.send(`Rewinded the song for ${time}!`)
  }
}
