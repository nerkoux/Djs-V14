const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'queue',
  description: "Shows the server queue",
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing playing!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send(`${emoji.queue} | **Server Queue**\n${q}`)
  }
}
