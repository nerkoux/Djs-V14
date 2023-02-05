module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${emoji.error} | There is nothing in the queue right now!`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${emoji.error} | Please enter a valid number!`)
    queue.setVolume(volume)
    message.channel.send(`${emoji.success} | Volume set to \`${volume}\``)
  }
}
