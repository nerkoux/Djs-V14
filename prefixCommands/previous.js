const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'previous',
  description: "Plays the previous song",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    const song = queue.previous()
    message.channel.send(`${emoji.success} | Now playing:\n${song.name}`)
  }
}
