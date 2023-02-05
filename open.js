const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const bitbot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const config = require("./configuration.js");
const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const webserver = require("./dashboard")



let token = config.token
let dbd_license = config.dbd_license
let client_id = config.client_id
let client_secret = config.client_secret
let redirect_uri = config.redirect_uri
let emoji = config.emoji

bitbot.distube = new DisTube(bitbot, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})


bitbot.commands = new Collection()
bitbot.prefixcommand = new Collection();

const rest = new REST({ version: '10' }).setToken(token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

// slashCOMMAND HANDLER INTERACTION //
const commands = [];
readdirSync('./commands').forEach(async file => {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  bitbot.commands.set(command.data.name, command);
})


// prefixCOMMAND HANDLER INTERACTION //
const prefixcommands = [];
readdirSync('./prefixCommands').forEach(async file => {
  const command = require(`./prefixCommands/${file}`);
  bitbot.prefixcommand.set(command.name, command);
})




bitbot.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(bitbot.user.id),
                { body: commands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${bitbot.user.username} Bot is ready!`);
})

//event-handler
readdirSync('./events').forEach(async file => {
	const event = require(`./events/${file}`);
	if (event.once) {
		bitbot.once(event.name, (...args) => event.execute(...args));
	} else {
		bitbot.on(event.name, (...args) => event.execute(...args));
	}
})

//nodejs-events
process.on("unhandledRejection", e => { 
   console.log(e)
 }) 
process.on("uncaughtException", e => { 
   console.log(e)
 })  
process.on("uncaughtExceptionMonitor", e => { 
   console.log(e)
 })


 // Music Handler Distube

 const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
bitbot.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send(
      `${emoji.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
        song.user
      }\n${status(queue)}`
    )
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${emoji.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${emoji.success} | Added \`${playlist.name}\` playlist (${
        playlist.songs.length
      } songs) to queue\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${emoji.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${emoji.error} | No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Finished!'))

bitbot.login(token)
 webserver
