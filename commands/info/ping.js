module.exports = {
    name: "ping",
    run(message, args, client, lang) {
        const Discord = require('discord.js');
        let ping = Math.floor(message.client.ws.ping);

        message.channel.send(client.languages({phrase: 'ping.loading', locale: lang})).then(m => { //Ponemos un mensaje
            const embed = new Discord.MessageEmbed()
                .setThumbnail("https://img.freepik.com/vector-gratis/ilustracion-concepto-redes-sociales_53876-17828.jpg?size=626&ext=jpg")
                .setDescription(client.languages.__mf({phrase: 'ping.description', locale: lang}, {pingmessages: m.createdTimestamp - message.createdTimestamp, pingapi: ping}))
                .setColor("RANDOM");

            m.edit({embeds: [embed]});//Una vez se obtienen los datos, se edita
        });
    }
}