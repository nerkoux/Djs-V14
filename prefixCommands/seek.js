const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'seek',
  description: "Seeks the music forward",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    if (!args[0]) {
      return message.channel.send(`${emoji.error} | Please provide position (in seconds) to seek!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${emoji.error} | Please enter a valid number!`)
    queue.seek(time)
    message.channel.send(`Seeked to ${time}!`)
  }
}
