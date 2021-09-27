const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "setnick",
    async run(message, args, client, lang) {
        const Discord = require('discord.js')
        const {guild} = message;
        let p = await permissionAuth(message, 'MANAGE_NICKNAMES')
        if(!p === undefined || p ) return;
        
        let user = message.mentions.members.first();
        const newName = args.splice(1).join(' ')

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setnick.mentionperson', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        if (!newName) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setnick.newusername', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setnick.higherorequal', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        
        user.setNickname(newName)
        const embedLock = new Discord.MessageEmbed()
            .setTitle(client.languages.__({phrase: 'setnick.sucesschange', locale: lang}))
            .setColor('GREEN');
        message.channel.send({embeds: [embedLock]})
    }
}