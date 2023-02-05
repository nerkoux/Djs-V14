const config = require("../configuration.js");
let prefix = config.prefix

module.exports = {
	name: 'messageCreate',
	execute: async(message) => {
  let client = message.client;
  if (message.author.bot || !message.guild) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
  let cmd = args.shift()?.toLowerCase();
  const command = client.prefixcommand.get(cmd)
  if(!command) return;
  if(command){
    command.run(client, message, args)
  }
  }};