const chalk = require('chalk')
const figlet = require('figlet')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		figlet('Hatsume V2', function(err, data){
			if(err) return console.log(err);
			console.log(data)
		})
		console.log(chalk.bold.green(`Logged in as ${client.user.tag}!`));
        client.user.setActivity('Hatsume | $$Help', {
            type: 'PLAYING'
        }) //PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS
        console.log(chalk.greenBright(`Activity set to: WATCHING ${client.presence.activities[0].name}`))
	},
};