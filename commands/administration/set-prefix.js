module.exports = {
    name: "set-prefix",
    async run(message, args, client, lang) {
        const Discord = require('discord.js');

        const db = require('megadb');
        const servidores = new db.crearDB(`servidores`);

        let prefix = args[0];
        if (!prefix) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setprefix.enterprefix', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if (prefix.length > 4){
          return message.channel.send(client.languages.__({phrase: 'embederror.toolong', locale: lang}))
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'setprefix.hasadministrator', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        if(prefix == "$$"){
            message.channel.send(client.languages.__mf({phrase: 'setprefix.sucesschange', locale: lang}, {prefix: prefix}))
            servidores.delete(`${message.guild.id}.prefix`)
            return;
        }
        servidores.set(`${message.guild.id}.prefix`, args[0]).then(
            message.channel.send(client.languages.__mf({phrase: 'setprefix.sucesschange', locale: lang}, {prefix: prefix}))
        );
    }
} 