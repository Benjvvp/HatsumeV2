const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "banlist",
    async run(message, args, client) {

        const { MessageEmbed, splitMessage } = require('discord.js')
        
        let p = await permissionAuth(message, 'BAN_MEMBERS')
        if(p === undefined || !p ) return;

        var blist = await message.guild.bans.fetch();

        if (blist.size <= 0) return message.channel.send("❌** | No bans were found on the server..**")
        var bansID = blist.map(b => '**' + b.user.username + '**: ' + b.user.id).join('\n') //aquí es donde definimos para que nos de el nombre y id de los usuarios baneados
        const description = '**📌 User and ID:** \n' + bansID

        let embed = new MessageEmbed() //definimos el embed
            .setColor("RANDOM")
            .setTitle('Banlist of **' + message.guild.name + '**')
            .setDescription(description)
            .setFooter('Order By: ' + message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          message.channel.send({embeds: [embed]})
    }
}