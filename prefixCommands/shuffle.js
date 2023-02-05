const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'shuffle',
  description: "Shuffles the music in queue",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    queue.shuffle()
    message.channel.send('Shuffled songs in the queue')
  }
}
