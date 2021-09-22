const musicDS = require("discord-music-player");
const Discord = require('discord.js');
module.exports = {
    name: "play",
    async run(message, args, client) {
        let guildQueue = client.player.getQueue(message.guild.id);
        if (!message.guild.me.permissions.has(`EMBED_LINKS`)){
            const embed = new MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**I need the necessary permissions to execute this command. `'+`EMBED_LINKS` +'`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]});
        }
        if(!args.join(' ')){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Enter the name of the song or the URL.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!message.member.voice.channel){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Enter a voice channel.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!message.member.voice.channel.full){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**I can not join the channel because it is completely full, to join maximizes the capacity of this or made a user.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**The bot is playing music on another channel.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let queue = await client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
        const embed = new Discord.MessageEmbed()
            .setAuthor('Added to the queue!!', message.author.avatarURL({
                format: "png",
                dynamic: true
            }))
            .setTitle(`${song.name}`)
            .setURL(`${song.url}`)
            .setThumbnail(`${song.thumbnail}`)
            .addField('Channel', `${song.author}`, true)
            .addField('Duration', `${song.duration}`, true)
            .addField('Volume', `${song.queue.volume}`, true)
            .setColor('AQUA')
        return message.channel.send({embeds: [embed]})
        }
}