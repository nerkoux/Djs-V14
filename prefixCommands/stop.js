const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    queue.stop()
    message.channel.send(`${emoji.success} | Stopped!`)
  }
}
