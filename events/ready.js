const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    let status = [ `Developed by Vex[R]#0001`,`${client.user.username}` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${status[i++ % status.length]}`, type: ActivityType.Listening }), 22000);
}};