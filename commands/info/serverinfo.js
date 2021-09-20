module.exports = {
    name: "serverinfo",
    run(message, args, client) {

        const Discord = require('discord.js');

        var server = message.guild;//Definimos server


        const embed = new Discord.MessageEmbed()
            .setDescription("**CURRENT SERVER INFORMATION**")
            .setThumbnail(server.iconURL())
            .setAuthor(server.name, server.iconURL())//aca va a aparecer el icono y nombre del server
            .addField('**`📝` ID**', server.id, true)
            .addField('**`📅` Creation Date**', `${server.createdAt.toDateString().split(" ")[2]}/${server.createdAt.toDateString().split(" ")[1]}/${server.createdAt.toDateString().split(" ")[3]}`, true)
            .addField("**`📡` Region**", server.preferredLocale, true)
            .addField("**`📜` Owner of the Server**", `${server.fetchOwner()}`, true)//con esto obtenemos el creador del server
            .addField("**`📑` Server Owner ID**", `${server.ownerId}`, true)//con esto la id del creador del server
            .addField("**`📁` Channels**", `${server.channels.cache.size}`, true)
            //con esto todos los canales del servidor
            .addField('**`📁` Members**', `${server.memberCount}`, true)//con esto obtenemos los miembros que hay en el server
            .addField("**`🤖` Bots**", `${server.members.cache.filter(m => m.user.bot).size}`, true)//con esto obtenemos los bots del server
            .addField('**`🔐` Level of Verifiaction**', `${server.verificationLevel}`, true)//con esto obtenemos el nivel de verificacion del server
            .addField('**`📚` Roles**', `${server.roles.cache.size}`, true)//con esto la cantidad de roles
            .setColor("00ffff")//establecemos el color  yo puse random para que salga diferente color
        message.channel.send({embeds: [embed]});//enviamos el embed
    }
}