const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'pause',
  description: "Pauses the music",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send('Resumed the song for you :)')
    }
    queue.pause()
    message.channel.send('Paused the song for you :)')
  }
}
