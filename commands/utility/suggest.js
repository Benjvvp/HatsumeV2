module.exports = {
    name: "suggest",
    async run(message, args, client) {

        const Discord = require('discord.js');

        const suggest = args.join(' ')
        if (suggest < 5) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription(`**Please enter a suggestion. It must be larger than 5 sides**`)
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        const embeduser = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle('¡ Suggestion Sent !')
            .setDescription(`**Suggestion: \`\`${suggest}\`\` \n Thank you very much for helping us to improve the bot.**`)
            .setThumbnail('https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif')
            .setTimestamp()
            .setColor('GREEN')
        message.channel.send({embeds: [embeduser]})
        const embedsned = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL())
            .setTitle('¡ A suggestion has arrived !')
            .setDescription(`**Suggestion: \`\`${suggest}\`\` \nSuggestion of: <@${message.author.id}>\nSuggestion of server: ${message.guild.name}**`)
            .setColor('GREEN')
            .setTimestamp()
        client.channels.cache.get('829400764089630761').send({embeds: [embedsned]});
    }
}