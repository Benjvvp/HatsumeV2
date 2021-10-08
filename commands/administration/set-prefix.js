module.exports = {
    name: "set-prefix",
    async run(message, args, client, lang) {
        const Discord = require('discord.js');

        const serverDB = require('../../database/schemas/Guild')
        let serv = await serverDB.find({id: message.guild.id});

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

        if(serv[0].prefix === prefix){
            return message.channel.send(client.languages.__({phrase: 'setprefix.equal', locale: lang}))
        }
        if(serv[0].prefix == null && prefix === '$$'){
            return message.channel.send(client.languages.__({phrase: 'setprefix.equal', locale: lang}))
        }
        if(prefix == "$$"){
            serverDB.updateOne({id: message.guild.id}, { $unset: {prefix: ''}}).then(
                message.channel.send(client.languages.__mf({phrase: 'setprefix.sucesschange', locale: lang}, {prefix: prefix}))
            );
            return;
        }
        serverDB.updateOne({id: message.guild.id}, {prefix: args[0]}).then(
            message.channel.send(client.languages.__mf({phrase: 'setprefix.sucesschange', locale: lang}, {prefix: prefix}))
        );
        
    }
} 