module.exports = {
    name: "randomuser",
    async run(message, args, client) {

        const Discord = require('discord.js');
        
        let randomuser = message.guild.members.cache.random().displayName;

        let embed = new Discord.MessageEmbed()
        .setTitle("¡ Random User ! 🎁")
        .setDescription(`**The random person I touch is ${randomuser}**`)
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}