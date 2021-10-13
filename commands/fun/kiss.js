module.exports = {
    name: "kiss",
    async run(message, args, client, lang) {
        const star = require('star-labs')
        const Discord = require('discord.js');
        
        let aA = message.author;
        let aB = message.mentions.users.first();

        if(aB === null || aB === undefined){
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'errors.needmention', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let embed = new Discord.MessageEmbed()
        .setDescription(client.languages.__mf({phrase: 'kiss.description', locale: lang}, {aA: aA, aB: aB}))
        .setImage(star.kiss())
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}