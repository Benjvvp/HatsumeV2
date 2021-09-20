const chalk = require('chalk')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(chalk.bold.green(`Logged in as ${client.user.tag}!`));
        client.user.setActivity('Hatsume | $$Help', {
            type: 'PLAYING'
        }) //PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS
        console.log(chalk.greenBright(`Activity set to: WATCHING ${client.presence.activities[0].name}`))
	},
};