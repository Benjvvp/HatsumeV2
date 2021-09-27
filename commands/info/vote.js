module.exports = {
    name: "vote",
    async run(message, args, client, lang) {
        const Discord = require('discord.js');
        
        const embed = new Discord.MessageEmbed()
        .setTitle(client.languages.__({phrase: 'vote.title', locale: lang}))
        .setDescription(client.languages.__({phrase: 'vote.description', locale: lang}))
        .setFooter(client.languages.__({phrase: 'vote.footer', locale: lang}))
        .setColor('BLUE')
        message.channel.send({embeds: [embed]})
    }
}