const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'nowplaying',
  description: "Shows the current playing music",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    const song = queue.songs[0]
    message.channel.send(`${emoji.play} | I'm playing **\`${song.name}\`**, by ${song.user}`)
  }
}
