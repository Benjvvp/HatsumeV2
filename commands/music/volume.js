const musicDS = require("discord-music-player");
const Discord = require('discord.js');
module.exports = {
    name: "volume",
    async run(message, args, client) {
        let guildQueue = client.player.getQueue(message.guild.id);

        if(!message.member.voice.channel){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Enter a voice channel.**')
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

        await guildQueue.setVolume(parseInt(args[0]))
        guildQueue = await client.player.getQueue(message.guild.id); //refresh
        const embed = new Discord.MessageEmbed()
            .setTitle('<a:checkgif:835970348687556645> `|` Volume changed correctly.')
            .setColor('AQUA')
        return message.channel.send({embeds: [embed]})
    }
}