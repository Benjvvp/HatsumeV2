const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "banlist",
    async run(message, args, client, lang) {
        const { MessageEmbed, splitMessage } = require('discord.js')

        let p = await permissionAuth(message, 'BAN_MEMBERS')
        if(!p === undefined || p ) return;

        var blist = await message.guild.bans.fetch();

        if (blist.size <= 0) return message.channel.send(client.languages.__({phrase: 'banlist.nobans', locale: lang}))
        var bansID = blist.map(b => '**' + b.user.username + client.languages.__({phrase: 'banlist.description', locale: lang}) + b.user.id).join('\n') //aquí es donde definimos para que nos de el nombre y id de los usuarios baneados
        const description = '' + bansID;

        let embed = new MessageEmbed() //definimos el embed
            .setColor("RANDOM")
            .setTitle(client.languages.__mf({phrase: 'ban.embedtitle', locale: lang}), {guildName: guild.name})
            .setDescription(description)
            .setFooter(client.languages.__({phrase: 'banlist.orderby', locale: lang}) + message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
          message.channel.send({embeds: [embed]})
    }
}