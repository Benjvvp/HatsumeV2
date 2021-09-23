module.exports = {
    name: "set-lang",
    async run(message, args, client) {

        const Discord = require('discord.js');

        const db = require('megadb');
        const servidores = new db.crearDB(`servidores`);

        let lang = args[0].toLowerCase();

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You do not have the necessary permission to execute this command. `ADMINISTRATOR`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }

        if (!lang) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to enter the `new lang`\n Supported: Spanish - English**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        if(!lang == 'english' || !lang == 'spanish') return message.channel.send('**Lang supported: Spanish - English**')
        if(lang == "english"){
            message.channel.send(`Lang changed correctly to \`english\``)
            servidores.delete(`${message.guild.id}.lang`)
            return;
        }
        servidores.set(`${message.guild.id}.lang`, args[0]).then(
            message.channel.send(`Lang changed correctly to \`${lang}\``)
        );
    }
} 