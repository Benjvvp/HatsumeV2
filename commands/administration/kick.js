const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "kick",
    async run(message, args, client) {

        const Discord = require('discord.js')

        let user = message.mentions.users.first();

        let p = await permissionAuth(message, 'KICK_MEMBERS')
        if(!p.embeds.MessageEmbed) return;
        
        if (message.mentions.users.size < 1){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to mention the person you want to kick.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        let razon = args[0] ? args.slice(1).join(" ") : "Reason unspecified"

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You cannot kick a user with higher or equal rank.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        if (!message.guild.member(user).kickable){
            const embed = new Discord.MessageEmbed()
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**I cannot ban this user.**')
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
        }  
        message.guild.member(user).kick(razon);

        //Aqui empezamos a construir el RichEmbed.

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setThumbnail(!!member.user ? member.user.displayAvatarURL() : member.displayAvatarURL())
        .setTitle('¡Successful kick!')
        .addField(`> Kicked User`, user.username)
        .addField('> Reason', razon)
        .setTimestamp() 
        .setColor('AQUA')
        message.channel.send({embeds: [embed]});
    }
}