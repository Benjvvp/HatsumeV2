const permissionAuth = require('../../handler/permissionAuth')

module.exports = {
    name: "unban",
    async run(message, args, client, lang) {
        const Discord = require('discord.js')
        let p = await permissionAuth(message, 'BAN_MEMBERS')
        if(!p === undefined || p ) return;
        
        let userID = args[0]
        if (!userID) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'unban.validid', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        let razon = args.slice(1).join(" ") ? args.slice(1).join(" ") : client.languages.__({phrase: 'unban.reason', locale: lang});


        message.guild.fetchBans().then(bans => {
            if (bans.size == 0) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                    .setDescription(client.languages.__({phrase: 'unban.nobans', locale: lang}))
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            let unbanuser = bans.find(b => b.user.id == userID)
            if (!unbanuser){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                    .setDescription(client.languages.__({phrase: 'unban.erroruser', locale: lang}))
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            message.guild.members.unban(unbanuser.user)//desbaneamos al usuario
            const embedunban = new Discord.MessageEmbed()
                .setTitle(client.languages.__({phrase: 'unban.sucesstitle', locale: lang}))
                .addField(client.languages.__({phrase: 'unban.sucessmember', locale: lang}), `<@${userID}>`)
                .addField(client.languages.__({phrase: 'unban.sucessreason', locale: lang}), `${razon}`)
                .setColor('AQUA')
            message.channel.send({embeds: [embedunban]});//mandamos el embed
        });
    }
}