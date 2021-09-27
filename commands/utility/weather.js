module.exports = {
    name: "weather",
    run(message, args, client, lang) {

        const Discord = require('discord.js');

        const weather = require("weather-js"); //Instalamos el paquete 7w7

        weather.find({ search: args.join(" "), degreeType: "C" }, function (
            err,
            result) {
            if (args.length < 1) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                    .setDescription(client.languages.__({phrase: 'weather.enterlocation', locale: lang}))
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }

            let current;
            let location;
            try{
                current = result[0].current;
                location = result[0].location;
            } catch(e){
                const embed = new Discord.MessageEmbed()
                    .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                    .setDescription(client.languages.__({phrase: 'weather.validlocation', locale: lang}))
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }

            const embed = new Discord.MessageEmbed()

                .setDescription("`" + current.skytext + "`")
                .setAuthor(client.languages.__mf({phrase: 'weather.embedauthor', locale: lang}, {currentcity: current.observationpoint}))
                .setThumbnail(current.imageUrl) //Cambiara el Thumbnail depende del clima
                .setColor("RANDOM")
                .addField(client.languages.__({phrase: 'weather.timezone', locale: lang}), `GMT${location.timezone}`, true) //Zona horaria
                .addField(
                    client.languages.__({phrase: 'weather.temperature', locale: lang}),
                    `${current.temperature} Grados ${location.degreetype}`,
                    true
                ) //La temperatura en celsius
                .addField(client.languages.__({phrase: 'weather.wind', locale: lang}), current.windspeed, true) //La velocidad del viento
                .addField(client.languages.__({phrase: 'weather.humidity', locale: lang}), `${current.humidity}%`, true) //humedad ._.
                .addField(client.languages.__({phrase: 'weather.date', locale: lang}), current.day + " " + current.date, true) //Fecha
                .setFooter(client.languages.__({phrase: 'weather.embedfooter', locale: lang})) //Si quieren ponganle mas cosas, no hace falta el footer
                .setTimestamp(new Date()) //agregan si quieren la hora a la que se pidio el clime

            message.channel.send({embeds: [embed]}); //Al final enviamos el embed
        });
    }
}