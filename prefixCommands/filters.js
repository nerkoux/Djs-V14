const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'filter',
  description: 'Applies the filter on music',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    const filter = args[0]
    if (filter === 'off' && queue.filters.size) queue.filters.clear()
    else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter)
      else queue.filters.add(filter)
    } else if (args[0]) return message.channel.send(`${emoji.error} | Not a valid filter`)
    message.channel.send(`Current Queue Filter: \`${queue.filters.names.join(', ') || 'Off'}\``)
  }
}
