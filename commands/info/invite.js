module.exports = {
    name: "invite",
    run(message, args, client, lang) {

        const Discord = require('discord.js');

        let channel = message.channel;
        channel.createInvite({unique: true})
        .then(invite => {
        message.reply(client.languages.__mf({phrase: 'invite.description', locale: lang}, {code: invite.code}))
        })
    }
}