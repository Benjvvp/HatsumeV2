module.exports = {
    name: "vote",
    async run(message, args, client) {
        const Discord = require('discord.js');
        
        const embed = new Discord.MessageEmbed()
        .setTitle('¡Vote for Hatsume!')
        .setDescription('**Top GG - https://top.gg/bot/786361439676923974/vote** \n**Discord Bot List - https://discordbotlist.com/bots/hatsume/upvote**')
        .setFooter('Thanks for vote.')
        .setColor('BLUE')
        message.channel.send({embeds: [embed]})
    }
}