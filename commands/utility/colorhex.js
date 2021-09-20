module.exports = {
    name: "colorhex",
    async run(message, args) {

        require('dotenv').config(); //Importar DOTENV

        const client = require('alexflipnote.js');
        const alexclient = new client(process.env.KEY);

        const Discord = require('discord.js');

        const embederr = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Please provide a valid hex code, `without #` !**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED");

        if (!args[0]) {
            return await message.channel.send({embeds: [embederr]})
        }

        var isOk = /^[0-9A-F]{6}$/i.test(args[0])
        if (isOk === false) {
            return await message.channel.send({embeds: [embederr]})
        }

        let body = await alexclient.others.color(args[0]);

        const embed = new Discord.MessageEmbed()
            .setColor(`#${args[0]}`)
            .setTitle(body.name)
            .setDescription(`**Hex: ${body.hex}**`)
            .setImage(body.image)
        message.channel.send({embeds: [embed]});
    }
}