const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'repeat',
  description: "Repeats the music",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing playing!`)
    let mode = null
    switch (args[0]) {
      case 'off':
        mode = 0
        break
      case 'song':
        mode = 1
        break
      case 'queue':
        mode = 2
        break
    }
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
    message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
  }
}
