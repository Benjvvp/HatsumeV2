const { Client, Intents } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({ intents });
const chalk = require('chalk');
const fs = require('fs');

/* Insert .ENV File */
require('dotenv').config()
/* Event Handler */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const commandHandler = require('./handler/handlerMessages')

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Initialize multi languages
const i18n = require('./utils/i18n');
i18n(client);
//Initialize Music Manager
const { Player } = require("discord-music-player");

const player = new Player(client, {
    leaveOnEmpty: true,
	leaveOnStop: false,
	volume: 100,
	quality: 'high',
	leaveOnEnd: false,
	deafenOnJoin: true, // This options are optional.
	timeout: 5
});
client.player = player;
//Initialize Comamnd Manager
commandHandler(client)
//Music Queue
client.queue = new Map()
//Connect with Discord
client.login(process.env.TOKEN);

// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})