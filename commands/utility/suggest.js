module.exports = {
    name: "suggest",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');

        const suggest = args.join(' ')
        if (suggest < 5) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'suggest.entersuggest', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        const embeduser = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle(client.languages.__({phrase: 'suggest.suggestsenttitle', locale: lang}))
            .setDescription(client.languages.__mf({phrase: 'embederror.suggestsentdesc', locale: lang}, {suggest: suggest}))
            .setThumbnail('https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif')
            .setTimestamp()
            .setColor('GREEN')
        message.channel.send({embeds: [embeduser]})
        const embedsned = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL())
            .setTitle(client.languages.__({phrase: 'suggest.suggestarrivedtitle', locale: lang}))
            .setDescription(client.languages.__mf({phrase: 'suggest.suggestarriveddesc', locale: lang}, {suggest: suggest, authorid: message.author.id, guildname: message.guild.name}))
            .setColor('GREEN')
            .setTimestamp()
        client.channels.cache.get('889675034132615219').send({embeds: [embedsned]});
    }
}