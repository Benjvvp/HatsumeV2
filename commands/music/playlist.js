const musicDS = require("discord-music-player");
const Discord = require('discord.js');
module.exports = {
    name: "playlist",
    async run(message, args, client, lang) {
        let guildQueue = client.player.getQueue(message.guild.id);
        if(!args.join(' ')){
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'musicgeneral.enternamesong', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!message.member.voice.channel){
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'musicgeneral.entervoice', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'musicgeneral.anotherchannel', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(message.member.voice.channel.joinable){
            if(message.member.voice.channel.full){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                    .setDescription(client.languages.__({phrase: 'play.channelfull', locale: lang}))
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
        }
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
        const embed = new Discord.MessageEmbed()
            .setAuthor(client.languages.__({phrase: 'playlist.authortitle', locale: lang}), message.author.avatarURL({
                format: "png",
                dynamic: true
            }))
            .setTitle(client.languages.__mf({phrase: 'playlist.title', locale: lang}, {songs: song.songs.length}))
            .setColor('AQUA')
        return message.channel.send({embeds: [embed]})
    }
}