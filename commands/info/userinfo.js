module.exports = {
    name: "userinfo",
    async run(message, args, client, lang) {
        const Discord = require('discord.js');
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"
        let status;
        if(user.presence === null){
            status = client.languages.__({phrase: 'userinfo.offline', locale: lang})
        }else{
            switch (user.presence.status) {
                case "online":
                    status = client.languages.__({phrase: 'userinfo.online', locale: lang});
                    break;
                case "dnd":
                    status = client.languages.__({phrase: 'userinfo.dnd', locale: lang});
                    break;
                case "idle":// En el caso idle..
                    status = client.languages.__({phrase: 'userinfo.idle', locale: lang});
                    break;
                case "offline":
                    status = client.languages.__({phrase: 'userinfo.offline', locale: lang});
                    break;
            }
        }
        let badges1 = {
            'EARLY_SUPPORTER': '<:earlysupport:889929381340938270>',
            'DISCORD_EMPLOYEE': '<:discordemployee:889929620869218304>',
            'DISCORD_PARTNER': '<:discordpartner:889928392802197505>',
            'HYPESQUAD_EVENTS': '<:hypesquad:889928915290832946>',
            'HOUSE_BRAVERY': '<:bravery:889922322436329502>',
            'HOUSE_BRILLIANCE': '<:brilliance:889922322297925693>',
            'BUGHUNTER_LEVEL_1': '<:bighunterlevel1:889928766569209856>',
            'BUGHUNTER_LEVEL_2': '<:bighunterlevel2:889928393209045054>',
            'VERIFIED_DEVELOPER': '<:botsverified:889929159562895490>',
            'HOUSE_BALANCE': '<:balance:889922322293739610>',
            'VERIFIED_BOT': '<a:giphyverifid:835970692930863185>',
          }
        /* CLient STATUS */
        let clientStatus = "";
        if(user.presence === null){
            clientStatus = status;
        } else{
            if (user.presence.clientStatus) {
                if (user.presence.clientStatus["web"]) {
                    clientStatus += client.languages.__({phrase: 'userinfo.Web', locale: lang});
                }
                else if (user.presence.clientStatus["mobile"]) {
                    clientStatus += client.languages.__({phrase: 'userinfo.Mobile', locale: lang});
                }
                else if (user.presence.clientStatus["desktop"]) {
                    clientStatus += client.languages.__({phrase: 'userinfo.Desktop', locale: lang});
                }
            }
        }
        
        /* PERMISSION CALCULATOR */
        let m = message.guild.members.cache.get(user.id) || await message.guild.members.fetch(user.id, { cache: true });
        let permissions = '';
        let perms = m.permissions.toArray();
        if(perms.includes('ADMINISTRATOR')) permissions = 'ADMINISTRATOR';
        else{
            perms.join(' , ');
            permissions = perms
        }

        const embed = new Discord.MessageEmbed() 
            .setAuthor(client.languages.__mf({phrase: 'userinfo.author', locale: lang}, {user: user.user.id}))
            .addField(client.languages.__({phrase: 'userinfo.informationi', locale: lang}), client.languages.__mf({phrase: 'userinfo.informationid', locale: lang}, {highrol: user.roles.highest,roles: user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `${roles}`).join(" **|** ") || "No Roles", nickname: user.nickname ? user.nickname : 'None', boost: user.premiumSince ? `Yes` : "No"}), false)
            .addField(client.languages.__({phrase: 'userinfo.statesi', locale: lang}), client.languages.__mf({phrase: 'userinfo.statesid', locale: lang}, {activity: user.presence != null ? user.presence.game.name : "Nothing", status: status, clientStatus: clientStatus}), false)
            .addField(client.languages.__({phrase: 'userinfo.useri', locale: lang}), client.languages.__mf({phrase: 'userinfo.userid', locale: lang}, {userregistered: user.user.createdAt.toLocaleDateString("es-pe"), userbadges: user.user.flags.toArray().length ? user.user.flags.toArray().map(badge => badges1[badge]).join(' ') : "It does not have", useravatar: `[Download](${user.user.displayAvatarURL({format: 'png',dynamic: true})})`,username: user.user.username, userid: user.id}), false)
            .addField(client.languages.__({phrase: 'userinfo.permi', locale: lang}), `\n
            \`\`\`${permissions}\`\`\`
            
            `)
            .setColor(`AQUA`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        await message.channel.send({embeds: [embed]})
    }
}