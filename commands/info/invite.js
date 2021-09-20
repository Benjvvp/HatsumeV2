module.exports = {
    name: "invite",
    run(message, args, client) {

        const Discord = require('discord.js');

        let channel = message.channel;
        channel.createInvite({unique: true})
        .then(invite => {
        message.reply("Here it is in link so you can invite the people you want!: https://discord.gg/" + invite.code)
        })
    }
}