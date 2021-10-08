module.exports = {
    name: "set-lang",
    async run(message, args, client, lang) {
        const Discord = require('discord.js');

        const serverDB = require('../../database/schemas/Guild')

        let langt = args[0];

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setlang.hasadministrator', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }

        if (!langt) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setlang.enterlang', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        langt = langt.toLowerCase();
        if(!langt == 'english' || !langt == 'spanish') return message.channel.send(client.languages.__({phrase: 'setlang.langusupp', locale: lang}))
        if(langt === 'english') langt = 'en';
        if(langt === 'spanish') langt = 'es';
        serverDB.updateOne({id: message.guild.id}, {lang: langt }).then(
            message.channel.send(client.languages.__mf({phrase: 'setlang.sucess', locale: langt}, {lang: langt}))
        );
    }
} 