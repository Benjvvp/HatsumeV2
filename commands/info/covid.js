module.exports = {
    name: "covid",
    async run(message, args, client) {

        const Discord = require('discord.js');

        //Indicamos la pagina web de los datos, puedes poner o cambiar un dato si prefieres
        let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
        let data = await res.json();
        //Hacemos un embed para indicar los datos
        let covid = new Discord.MessageEmbed()
            .setTitle('Covid-19 Information')
            .addField('`🤕` Cases', data.cases.toLocaleString(), true)
            .addField('`🤯` Cases today', data.todayCases.toLocaleString(), true)
            .addField('`💀` Deaths', data.deaths.toLocaleString(), true)
            .addField('`👻` Deaths today', data.todayDeaths.toLocaleString(), true)
            .addField('`🥴` Critical Situations', data.critical.toLocaleString(), true)
            .addField('`😆` Recovered', data.recovered.toLocaleString(), true)
            .addField('`😷` Odds in a million', data.testsPerOneMillion.toLocaleString(), true)
            .addField('`🚫` Countries affected', data.affectedCountries.toLocaleString(), true)
            .setColor('#FF0000')
        message.channel.send({embeds: [covid]})
    }
}