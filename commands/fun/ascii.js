module.exports = {
    name: "ascii",
    async run(message, args, client) {
        const Discord = require('discord.js');

        const figlet = require("figlet");
        const { promisify } = require("util");
        const figletAsync = promisify(figlet);

        let texto = args.join(" ");
        if (!texto) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to `rite`something. (Maximum 20 characters.)**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send(embed)
        }
        if (texto.length > 20) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to write something `horter` (Maximum 20 characters.)**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send(embed)
        }
        let letras = await figletAsync(texto);
        message.channel.send("```" + letras + "```");
    }

}