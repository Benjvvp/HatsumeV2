module.exports = {
    name: "wikirandom",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');

        let embed = new Discord.MessageEmbed()
        .setTitle(client.languages.__({phrase: 'wikirandom.title', locale: lang}))
        .setDescription(client.languages.__({phrase: 'wikirandom.description', locale: lang}))
        .setThumbnail("https://media.giphy.com/media/j3c8gzkQCZuHxfzacL/giphy.gif")
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}