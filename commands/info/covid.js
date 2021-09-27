module.exports = {
    name: "covid",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');

        //Indicamos la pagina web de los datos, puedes poner o cambiar un dato si prefieres
        let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
        let data = await res.json();
        //Hacemos un embed para indicar los datos
        let covid = new Discord.MessageEmbed()
            .setTitle('Covid-19 Information')
            .addField(client.languages.__({phrase: 'covid.cases', locale: lang}), data.cases.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.casestoday', locale: lang}), data.todayCases.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.deaths', locale: lang}), data.deaths.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.deathstoday', locale: lang}), data.todayDeaths.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.criticalsituations', locale: lang}), data.critical.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.recovered', locale: lang}), data.recovered.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.oddsinamillion', locale: lang}), data.testsPerOneMillion.toLocaleString(), true)
            .addField(client.languages.__({phrase: 'covid.countriesaffected', locale: lang}), data.affectedCountries.toLocaleString(), true)
            .setColor('#FF0000')
        message.channel.send({embeds: [covid]})
    }
}