module.exports = {
    name: "avatar",
    run(message, args, client, lang) {

        const Discord = require('discord.js');

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; //definimos user
        const avatar = new Discord.MessageEmbed()//definimos el embed
            .setDescription(`[${client.languages.__({phrase: 'avatar.downloadtext', locale: lang})}](${user.displayAvatarURL({
                format: 'png',
                dynamic: true
            })})`)//Le agregamos una descripción con un link al avatar ya sea animado o estático
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("RANDOM")//Ponemos un color random
            .setFooter(client.languages.__mf({phrase: 'avatar.requested', locale: lang}, {displayName: message.member.displayName}));
        message.channel.send({embeds: [avatar]})//enviamos el embed
    }
}