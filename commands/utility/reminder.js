module.exports = {
    name: "reminder",
    run(message, args, client) {
        const Discord = require('discord.js');
        const ms = require('ms')

        const timer = args[0];
        if (!timer) {
            return message.reply('Please enter the time.');
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor(`Reminder ⏰`)
            .setDescription(`**Alright, I will remind you in \`\`${ms(ms(timer), { long: true })}\`\`**`)
            .setThumbnail("https://i.pinimg.com/originals/ae/d4/ab/aed4aba4654b8896857c9cfd3011d710.gif")
            .setColor("GREEN")
        message.channel.send({embeds: [embed]})

        setTimeout(function () {
            message.channel.send(`<@${message.author.id}>**, Your Timer is over**`)
            message.author.send(`<@${message.author.id}>**, Your Timer is over**`)
        }, ms(timer))
    }
}