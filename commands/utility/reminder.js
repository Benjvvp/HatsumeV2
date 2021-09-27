module.exports = {
    name: "reminder",
    run(message, args, client, lang) {
        const Discord = require('discord.js');
        const ms = require('ms')

        const timer = args[0];
        if (!timer) {
            return message.reply(client.languages.__({phrase: 'reminder.entertime', locale: lang}));
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor(client.languages.__({phrase: 'reminder.author', locale: lang}))
            .setDescription(client.languages.__mf({phrase: 'reminder.description', locale: lang}, {time: ms(ms(timer), { long: true })}))
            .setThumbnail("https://i.pinimg.com/originals/ae/d4/ab/aed4aba4654b8896857c9cfd3011d710.gif")
            .setColor("GREEN")
        message.channel.send({embeds: [embed]})

        setTimeout(function () {
            message.channel.send(client.languages.__mf({phrase: 'reminder.timeover', locale: lang}, {authorid: message.author.id}))
            message.author.send(client.languages.__mf({phrase: 'reminder.timeover', locale: lang}, {authorid: message.author.id}))
        }, ms(timer))
    }
}