module.exports = {
    name: "serverinfo",
    async run(message, args, client, lang) {
        const Discord = require('discord.js');
        const server = message.guild;
        let boostlevel = {
            NONE: client.languages.__({phrase: 'serverinfo.boostlevel_none', locale: lang}),
            TIER_1: client.languages.__({phrase: 'serverinfo.boostlevel_tier1', locale: lang}),
            TIER_2: client.languages.__({phrase: 'serverinfo.boostlevel_tier2', locale: lang}),
            TIER_3: client.languages.__({phrase: 'serverinfo.boostlevel_tier3', locale: lang})
        }
        let owner = await server.fetchOwner();

        const embed = new Discord.MessageEmbed() 
            .addField(client.languages.__({phrase: 'serverinfo.serveri', locale: lang}), client.languages.__mf({phrase: 'serverinfo.serverid'}, {servername: server.name, serverid: server.id, servercreation: `${server.createdAt.toDateString().split(" ")[2]}/${server.createdAt.toDateString().split(" ")[1]}/${server.createdAt.toDateString().split(" ")[3]}`, serverboost: boostlevel[server.premiumTier], serverpreferredLocale: server.preferredLocale, serverMemberCount: server.memberCount}), false)
            .addField(client.languages.__({phrase: 'serverinfo.owneri', locale: lang}), client.languages.__mf({phrase: 'serverinfo.ownerid'}, {owneruser: owner.user.username, ownerid: owner.user.id, boostserver: owner.user.premiumSince ? client.languages.__({phrase: 'serverinfo.yes', locale: lang}) : client.languages.__({phrase: 'serverinfo.no', locale: lang})}), false)
            .addField(client.languages.__({phrase: 'serverinfo.otheri', locale: lang}), client.languages.__mf({phrase: 'serverinfo.otherid'}, {serverroles: server.roles.cache.size, serverchannels: server.channels.cache.size}), false)
            .setColor(`AQUA`)
            .setThumbnail(server.iconURL())
        await message.channel.send({embeds: [embed]})
    }
}