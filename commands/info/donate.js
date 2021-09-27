module.exports = {
    name: "donate",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');

        let embed = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTitle(client.languages.__({phrase: 'donate.title', locale: lang}))
        .setDescription(client.languages.__({phrase: 'donate.description', locale: lang}))
        .setImage('https://th.bing.com/th/id/Re7005de6727bd263cc8b61cc129e95e6?rik=qkMucJRjDXo4GQ&riu=http%3a%2f%2fstatic.tumblr.com%2f2v7rlu2%2flmjm1gmyc%2fhatsune_miku.gif&ehk=mVT1f2n1bBbn7IMvlZMW12DJ643khe0valTejyz4GMI%3d&risl=&pid=ImgRaw')
        message.channel.send({embeds: [embed]})
    }
}