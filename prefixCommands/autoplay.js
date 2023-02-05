const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'autoplay',
  description: "Auto plays the song",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`${emoji.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}
