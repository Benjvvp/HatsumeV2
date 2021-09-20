module.exports = {
    name: "ping",
    run(message, args, client) {
        const Discord = require('discord.js');
        let ping = Math.floor(message.client.ws.ping);

        message.channel.send(":ping_pong: Loading.....").then(m => { //Ponemos un mensaje
            const embed = new Discord.MessageEmbed()
                .setThumbnail("https://img.freepik.com/vector-gratis/ilustracion-concepto-redes-sociales_53876-17828.jpg?size=626&ext=jpg")
                .setDescription(
                    `:speech_balloon: Ping Message Messages: \`${m.createdTimestamp -
                    message.createdTimestamp} ms\`\n :satellite_orbital: Ping DiscordAPI: \`${ping} ms\``
                ) //Obtenemos el ping de los mensajes y del API
                .setColor("RANDOM");

            m.edit({embeds: [embed]});//Una vez se obtienen los datos, se edita
        });
    }
}