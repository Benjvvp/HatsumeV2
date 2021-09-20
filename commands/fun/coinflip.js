module.exports = {
    name: "coinflip",
    async run(message, args, client){

        const Discord = require('discord.js');
        const coin = 
        ['https://cdn.discordapp.com/attachments/315914386944557056/369580701269360656/cara.png',
        'https://cdn.discordapp.com/attachments/315914386944557056/369580737919451137/sello.png'];//definimos las imagenes de la moneda como una constante.
        
        const embed = new Discord.MessageEmbed() //creamos el embed
        .setAuthor(message.author.username+" Got:", message.author.avatarURL)
        .setImage(coin[Math.floor(coin.length * Math.random())])//usamos mathRandom para que la imagen salga de una manera random al usar el comando.
        .setColor("RANDOM")//aqui yo puse para que salga un color random,pero pueden poner el que quieran uwu.
        
        message.channel.send({embeds: [embed]});

    }
}