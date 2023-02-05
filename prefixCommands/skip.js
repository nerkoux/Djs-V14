const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'skip',
  description: "Skips the music",
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    try {
      const song = await queue.skip()
      message.channel.send(`${emoji.success} | Skipped! Now playing:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${emoji.error} | ${e}`)
    }
  }
}
