module.exports = {
    name: "userinfo",
    async run(message, args, client) {
        const Discord = require('discord.js');
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"

        let status;
        switch (user.presence.status) {
            case "online":
                status = "Online";
                break;
            case "dnd":
                status = "Don't disturb";
                break;
            case "idle":// En el caso idle..
                status = "Absent";
                break;
            case "offline":
                status = "Disconnected";
                break;
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
        if (user.presence.clientStatus) {
            if (user.presence.clientStatus["web"]) {
                clientStatus += 'Web'
            }
            else if (user.presence.clientStatus["mobile"]) {
                clientStatus += 'Mobile';
            }
            else if (user.presence.clientStatus["desktop"]) {
                clientStatus += 'Desktop';
            }
        } else {
            clientStatus = status[user.presence.status];
        }
        if (!clientStatus)
        clientStatus = "Offline/Invisible";
        /* PERMISSION CALCULATOR */
        let m = message.guild.members.cache.get(user.id) || await message.guild.members.fetch(user.id, { cache: true });
        let permissions = '';
        let perms = m.permissions.toArray();
        if(perms.includes('ADMINISTRATOR')) permissions = 'ADMINISTRATOR';
        else perms.join(', ')

        const embed = new Discord.MessageEmbed() 
            .setAuthor(`Information from ${user.user.username}`)
            .addField('**Information on the server**', `
            > <:bluepoint:889915814684278784> **Highest role:** ${user.roles.highest}
            > <:bluepoint:889915814684278784> **Roles:** ${user.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `${roles}`).join(" **|** ") || "No Roles"}
            > <:bluepoint:889915814684278784> **NickName:** ${user.nickname ? user.nickname : 'None'}
            > <:bluepoint:889915814684278784> **Boost this server:** ${user.premiumSince ? `Yes` : "No"}`, false)
            .addField('**States**', `
            > <:bluepoint:889915814684278784> **Activity:** ${user.presence.game != null ? user.presence.game.name : "Nothing"}
            > <:bluepoint:889915814684278784> **State:** ${status}
            > <:bluepoint:889915814684278784> **Device:** ${clientStatus}
            `, false)
            .addField('**User information**', `
            > <:bluepoint:889915814684278784> **Registered:** ${user.user.createdAt.toLocaleDateString("es-pe")}
            > <:bluepoint:889915814684278784> **Badges:** ${user.user.flags.toArray().length ? user.user.flags.toArray().map(badge => badges1[badge]).join(' ') : "It does not have"}
            > <:bluepoint:889915814684278784> **Avatar:** ${`[Download](${user.user.displayAvatarURL({
                format: 'png',
                dynamic: true
            })})`}
            > <:bluepoint:889915814684278784> **Name:** ${user.user.username}
            > <:bluepoint:889915814684278784> **ID:** ${user.id}
            `, false)
            .addField('**Permission**', `\n
            \`\`\`${permissions}\`\`\`
            
            `)
            .setColor(`AQUA`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        await message.channel.send({embeds: [embed]})
    }
}