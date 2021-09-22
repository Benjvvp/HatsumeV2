const permissionAuth = require('../../handler/permissionAuth')

module.exports = {
    name: "unban",
    async run(message, args, client) {
        const Discord = require('discord.js')
        
        let p = permissionAuth(message, 'BAN_MEMBERS')
        if(p === undefined || !p ) return;
        
        let userID = args[0]
        if (!userID) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Enter a valid ID to unban the user.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        let razon = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Reason unspecified"


        message.guild.fetchBans().then(bans => {
            if (bans.size == 0) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**There are no bans registered on this server.**')
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            let unbanuser = bans.find(b => b.user.id == userID)
            if (!unbanuser){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**The user does not exist, please enter a valid ID.**')
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            message.guild.members.unban(unbanuser.user)//desbaneamos al usuario
            const embedunban = new Discord.MessageEmbed()
                .setTitle(`Correctly Unban`)
                .addField(`Member:`, `<@${userID}>`)
                .addField(`Reason:`, `${razon}`)
                .setColor('AQUA')
            message.channel.send({embeds: [embedunban]});//mandamos el embed
        });
    }
}