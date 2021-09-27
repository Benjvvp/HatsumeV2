module.exports = {
    name: "randomuser",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');
        
        let randomuser = message.guild.members.cache.random().displayName;

        let embed = new Discord.MessageEmbed()
        .setTitle(client.languages.__({phrase: 'randomuser.title', locale: lang}))
        .setDescription(client.languages.__mf({phrase: 'randomuser.description', locale: lang}, {randomuser: randomuser}))
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}