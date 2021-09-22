const permissionAuth = require('../../handler/permissionAuth')
module.exports = {
    name: "ban",
    async run(message, args, client) {
        const Discord = require('discord.js')

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter(message.guild.name, message.guild.iconURL())

        let p = permissionAuth(message, 'BAN_MEMBERS')
        if(!p.embeds.MessageEmbed) return;

        //SÃ­ el campo estÃ¡ vacÃ­o no ejecutarÃ¡ la siguiente acciÃ³n.
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to mention `one person`. __It can be anyone but you.__**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        //Creamos la variable para poder obtener y buscar miembros.
        let member = message.mentions.members.first() || message.guild.members.resolve(args[0]) || message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0]) || await client.users.fetch(args[0])
        if (!member || member.id == message.author.id) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to mention `one person`. __It can be anyone but you.__**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        if (message.guild.members.resolve(member.id)) { // retorna un miembro o undefined si no fue encontrado en el servidor-
            // Declaramos SÃ­ el usuario mencionado tiene un nivel jerarquico mayor o igual al autor del baneo.
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**You cannot ban a user with higher or equal rank.**')
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            if (!member.bannable) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**I cannot ban this user.**')
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
        }
        // Declaramos una variable para almacenar la razÃ³n.
        let razon = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Reason unspecified" //Al no llenar el campo de razÃ³n salta "RazÃ³n no especificada"
        //Cumpliendo con lo anterior procede a realizar el baneo con su respectiva razÃ³n.
        message.guild.members.ban(member.id, { reason: razon })
        embed
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(!!member.user ? member.user.displayAvatarURL() : member.displayAvatarURL())
            .setTitle('¡Successful ban!')
            .addField(`> Banned User`, !!member.user ? member.user.tag : member.tag)
            .addField('> Reason', razon)
            .setColor('AQUA')
            .setTimestamp()

        if (!!member.user) member.user.send({embeds: [embed]}).catch(e => e);
        message.channel.send({embeds: [embed]})

    }
}