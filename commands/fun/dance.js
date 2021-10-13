module.exports = {
    name: "dance",
    async run(message, args, client, lang) {
        const star = require('star-labs')
        const Discord = require('discord.js');
        
        let aA = message.author;

        let embed = new Discord.MessageEmbed()
        .setDescription(client.languages.__mf({phrase: 'dance.description', locale: lang}, {aA: aA}))
        .setImage(star.dance())
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}