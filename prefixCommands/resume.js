const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'resume',
  description: "Resumes the paused music",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Resumed the song for you :)')
    } else {
      message.channel.send('The queue is not paused!')
    }
  }
}
