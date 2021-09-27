module.exports = {
    name: "commands",
    run(message, args, client, lang) {

        const Discord = require('discord.js');

        const comandosembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(client.languages.__({phrase: 'commands.title', locale: lang}))
        .addFields(
            {name: client.languages.__({phrase: 'commands.administration', locale: lang}), value: "```Ban , BanList , Kick , UnBan , Clear , Set-Prefix , Set-lang , Unlock , Lock , Setnick, ChannelTools , AddRole, RemoveRole.```"},
            {name: client.languages.__({phrase: 'commands.fun', locale: lang}), value: "```8Ball , Ascii , CoinFlip , Say , Sharpen , Trigger , Ohno , Rainbow , Shit , Trash , Wanted , Wasted.```"},
            {name: client.languages.__({phrase: 'commands.information', locale: lang}), value: "```Avatar , Commands , Covid , Donate , Help , Invite , Ping , ServerInfo , Stats , UserInfo, Vote , Structure , permissions , NpmSearch , DJSDoc.```"},
            {name: client.languages.__({phrase: 'commands.utility', locale: lang}), value: "```Calculate , ColorHex , Nuke , RandomNumber , RandomUser , Reminder , Reverse , Weather , WikiRandom , Suggest , Generate-Password , InfoEmoji.```"},
            {name: client.languages.__({phrase: 'commands.music', locale: lang}), value: "```Play , Playlist , Pause , Resume , Volume , Skip , Queue , Playing , Stop , Lyrics.```"},
            {name: client.languages.__({phrase: 'commands.owner', locale: lang}), value: "```Eval , Shutdown , Suggest-Accept , Suggest-Rechaze.```"},
            {name: client.languages.__({phrase: 'commands.moreinformation', locale: lang}), value: client.languages.__({phrase: 'commands.description', locale: lang})}
        )
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${client.user.username}`);
        message.channel.send({embeds: [comandosembed]});
    }
}