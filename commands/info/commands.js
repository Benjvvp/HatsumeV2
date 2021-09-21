module.exports = {
    name: "commands",
    run(message, args, client) {

        const Discord = require('discord.js');

        const comandosembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Hatsume List Commands')
        .addFields(
            {name: "🔓  Administration", value: "```Ban , BanList , Kick , UnBan , Clear , Set-Prefix , Unlock , Lock , Setnick, ChannelTools , AddRole, RemoveRole.```"},
            {name: "🎉  Fun", value: "```8Ball , Ascii , CoinFlip , Say , Sharpen , Trigger , Ohno , Rainbow , Shit , Trash , Wanted , Wasted.```"},
            {name: "📢  Information", value: "```Avatar , Commands , Covid , Donate , Help , Invite , Ping , ServerInfo , Stats , UserInfo, Vote , Structure , permissions , NpmSearch , DJSDoc.```"},
            {name: "⚙️  Utility", value: "```Calculate , ColorHex , Nuke , RandomNumber , RandomUser , Reminder , Reverse , Weather , WikiRandom , Suggest , Generate-Password , InfoEmoji.```"},
            {name: "🎶  Music", value: "```Play , Playlist , Pause , Resume , Volume , Skip , Queue , Playing , Stop , Lyrics.```"},
            {name: "🔑  Owner", value: "```Eval , Shutdown , Suggest-Accept , Suggest-Rechaze.```"},
            {name: '**More information**', value: `\nIf you want to get more information about Hatsume just write \`$$help\` `}
        )
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .setFooter(`${client.user.username}`);
        message.channel.send({embeds: [comandosembed]});
    }
}