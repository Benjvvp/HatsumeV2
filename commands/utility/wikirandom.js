module.exports = {
    name: "wikirandom",
    async run(message, args, client) {

        const Discord = require('discord.js');

        let embed = new Discord.MessageEmbed()
        .setTitle("¡ WikiRandom ! 🎁")
        .setDescription("[¡ Click here to access the unknown... !](http://es.wikipedia.org/wiki/Special:Random)")
        .setThumbnail("https://media.giphy.com/media/j3c8gzkQCZuHxfzacL/giphy.gif")
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}