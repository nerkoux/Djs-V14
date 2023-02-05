const config = require("../configuration.js");
let emoji = config.emoji

module.exports = {
  name: 'leave',
  description: "Leaves the channel",
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}
