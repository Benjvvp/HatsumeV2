module.exports = {
    name: "suggest-accept",
    async run(message, args, client) {

        const Discord = require('discord.js');

        const user = args[0]
        const suggest = args.splice(1).join(' ')

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription(`**Send me the user to whom you want me to accept the suggestion.**`)
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if (!suggest) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription(`**Enter the suggestion sent by the user.**`)
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('¡ We have accepted your suggestion !')
            .setDescription(`**Suggestion: \`\`${suggest}\`\`**.`)
            .setThumbnail('https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif')
            .setFooter('Thank you very much for sending the suggestion.')
            .setColor("GREEN")
        const user1 = client.users.cache.get(user)
        user1.send({embeds: [embed]})

        const embed2 = new Discord.MessageEmbed()
            .setAuthor(`¡ The message has been sent correctly !`)
            .setDescription(`**Suggestion: \`\`${suggest}\`\`\n User: ${user1}. **`)
            .setThumbnail('https://i.pinimg.com/originals/51/8c/fc/518cfc9e3de40195948e2a1f1108a0fe.gif')
            .setColor("GREEN")
        message.channel.send({embeds: [embed2]})
    }
}