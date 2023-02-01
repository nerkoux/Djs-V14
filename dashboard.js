const SoftUI = require('dbd-soft-ui');
const db = require("quick.db")
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const bitbot = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const DBD = require("discord-dashboard");
const config = require("./configuration.js");


let token = config.token
let dbd_license = config.dbd_license
let client_id = config.client_id
let client_secret = config.client_secret
let redirect_uri = config.redirect_uri
let port = config.port
let domain = config.domain
let redirectUri = config.redirectUri
let owner = config.owner


/* --- DASHBOARD --- */
let langsSettings = {};
(async ()=>{
  let DBD = require('discord-dashboard');
  await DBD.useLicense(dbd_license);
  DBD.Dashboard = DBD.UpdatedClass();

  const Dashboard = new DBD.Dashboard({
    port: port,
    client: {
        id: client_id,
        secret: client_secret
    },
    redirectUri: `${domain}${redirectUri}`,
    domain: domain,
    ownerIDs: owner,
    useThemeMaintenance: true,
    useTheme404: true,
    bot: bitbot,
        theme: SoftUI({
            customThemeOptions: {
                index: async ({ req, res, config }) => {
                   const feeds = ["Current Users", "CPU", "System Platform", "Server Count"]
                    const cards = [
                        {
                            title: "CPU",
                            icon: "single-02",
                            getValue: "Guest",
                            progressBar: {
                                enabled: true,
                                getProgress: 50 // 0 - 100 (get a percentage of the progress)
                            }
                        }
                        // Include 3 more cards
                    ]

                    const graph = {
                        values: [690, 524, 345, 645, 478, 592, 468, 783, 459, 230, 621, 345],
                        labels: ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "10m"]
                    }

                    return {
                        feeds,
                        cards,
                        graph
                    }
                },
            },
            websiteName: "Vexr Bot",
            colorScheme: "Red",
            supporteMail: "support@support.com",
            icons: {
                favicon: 'https://matrixbot.tech/assets/img/white.png',
                noGuildIcon: "https://matrixbot.tech/assets/img/white.png",
                sidebar: {
                    darkUrl: 'https://matrixbot.tech/assets/img/white.png',
                    lightUrl: 'https://matrixbot.tech/assets/img/white.png',
                    hideName: true,
                    borderRadius: false,
                    alignCenter: true
                },
            },
            index: {
                card: {
                    category: "Vex",
                    title: "DJS V14 - EVERYTHING YOU NEED",
                    description: "Made by Love by Vex[R]</i></b>",
                    image: "./img/white.png",
                    link: {
                        enabled: true,
                        url: "https://google.com"
                    }
                },
                graph: {
                    enabled: true,
                    lineGraph: true,
                    title: 'Memory Usage',
                    tag: 'Memory (MB)',
                    max: 100
                },
            },
            sweetalert: {
                errors: {},
                success: {
                    login: "Successfully logged in.",
                }
            },
            preloader: {
                image: "/img/white.png",
                spinner: false,
                text: "Dashboard is loading",
            },
            admin: {
                pterodactyl: {
                    enabled: false,
                    apiKey: "apiKey",
                    panelLink: "https://panel.website.com",
                    serverUUIDs: []
                }
                },
                commands: [
                    {
                        category: "Info",
                        subTitle: "Information commands regarding the bot",
                        categoryId: "info", // No spaces or special characters
                        hideAlias: false, // Optional - Default: false - Hides the alias from all commands in the category
                        hideDescription: false, // Optional - Default: false - Hides the description from all commands in the category
                        hideSidebarItem: false, // Optional - Default: false - Hides the category from the sidebar
                        list: [
                            {
                                commandName: "ping",
                                commandUsage: "/ping",
                                commandDescription: "Returns the bot's latency!",
                                commandAlias: "None"
                            },
                            {
                                commandName: "help",
                                commandUsage: "/help",
                                commandDescription: "Shows all the bot available commands!",
                                commandAlias: "None"
                            }
                        ]
                    }
                ],
                
      }),
      settings: [
      ]
});
Dashboard.init()
})();
console.log(client_id)
bitbot.login(token)
