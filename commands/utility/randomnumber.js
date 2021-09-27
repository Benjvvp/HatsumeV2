module.exports = {
    name: "randomnumber",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');
        if(!args[0]){
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'randomnumber.from', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!args[1]){
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'randomnumber.to', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let from = args[0]
        let to = args[1]
        const random = Math.floor((Math.random() * to) + from);

        let embed = new Discord.MessageEmbed()
        .setTitle(client.languages.__({phrase: 'randomnumber.title', locale: lang}))
        .setDescription(client.languages.__mf({phrase: 'randomnumber.sucess', locale: lang}, {from: from, to: to, random: random}))
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}