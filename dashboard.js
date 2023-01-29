const DarkDashboard = require('dbd-dark-dashboard');
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const bitbot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const DBD = require("discord-dashboard");
const config = require("./configuration.js");


let dbd_license = config.dbd_license
let client_id = config.client_id
let client_secret = config.client_secret
let redirect_uri = config.redirect_uri


/* --- DASHBOARD --- */
let langsSettings = {};
(async ()=>{
  let DBD = require('discord-dashboard');
  await DBD.useLicense(dbd_license);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
      port: 80,
      client: {
          id: client_id,
          secret: client_secret
      },
      redirectUri: redirect_uri,
      domain: 'http://localhost',
      bot: bitbot,
      theme: DarkDashboard(DBD.default_configs.dbdDarkDashboard),
      settings: [
          {
              categoryId: 'setup',
              categoryName: "Setup",
              categoryDescription: "Setup your bot with default settings!",
              categoryOptionsList: [
                  {
                      optionId: 'lang',
                      optionName: "Language",
                      optionDescription: "Change bot's language easily",
                      optionType: DBD.formTypes.select({"Polish": 'pl', "English": 'en', "French": 'fr'}),
                      getActualSet: async ({guild}) => {
                          return langsSettings[guild.id] || null;
                      },
                      setNew: async ({guild,newData}) => {
                          langsSettings[guild.id] = newData;
                          return;
                      }
                  },
              ]
          },
      ]
  });
  Dashboard.init();
})();