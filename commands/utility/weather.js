module.exports = {
    name: "weather",
    run(message, args, client) {

        const Discord = require('discord.js');

        const weather = require("weather-js"); //Instalamos el paquete 7w7

        weather.find({ search: args.join(" "), degreeType: "C" }, function (
            err,
            result) {
            if (args.length < 1) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**Please `enter a location`.**')
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
                    .setAuthor(`❌ ¡ There's a mistake !`)
                    .setDescription('**An error has occurred with the location please enter a `valid location`.**')
                    .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                    .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }

            const embed = new Discord.MessageEmbed()

                .setDescription("`" + current.skytext + "`")
                .setAuthor(`Weather Status in ${current.observationpoint}`) //En el lugar que pusiste
                .setThumbnail(current.imageUrl) //Cambiara el Thumbnail depende del clima
                .setColor("RANDOM")
                .addField("Time Zone", `GMT${location.timezone}`, true) //Zona horaria
                .addField(
                    "Temperature",
                    `${current.temperature} Grados ${location.degreetype}`,
                    true
                ) //La temperatura en celsius
                .addField("Wind", current.windspeed, true) //La velocidad del viento
                .addField("Humidity", `${current.humidity}%`, true) //humedad ._.
                .addField("Date", current.day + " " + current.date, true) //Fecha
                .setFooter("Interesting weather out there, isn't it?") //Si quieren ponganle mas cosas, no hace falta el footer
                .setTimestamp(new Date()) //agregan si quieren la hora a la que se pidio el clime

            message.channel.send({embeds: [embed]}); //Al final enviamos el embed
        });
    }
}