const config = require("../configuration.js");
let prefix = config.prefix
let emoji = config.emoji

module.exports = {
	name: 'messageCreate',
	execute: async(message) => {
  let client = message.client;
  if (message.author.bot || !message.guild) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
  let cmd = args.shift()?.toLowerCase();
  const command = client.prefixcommand.get(cmd)
  if(!command) return;
  if (command.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(`${emoji.error} | You must be in a voice channel!`)
  }
  if(command){
    command.run(client, message, args)
  }
  }};