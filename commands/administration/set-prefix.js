module.exports = {
    name: "set-prefix",
    async run(message, args, client) {

        const Discord = require('discord.js');

        const db = require('megadb');
        const servidores = new db.crearDB(`servidores`);

        let prefix = args[0];
        if (!prefix) return message.channel.send('Enter a prefix please.')
        if (prefix.length > 4){
          return message.channel.send('The prefix entered is too long, please enter less than 5 characters.')
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You do not have the necessary permission to execute this command. `ADMINISTRATOR`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }

        if (!prefix) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to enter the `new prefix`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(prefix == "$$"){
            message.channel.send(`Prefix changed correctly to \`${prefix}\``)
            servidores.delete(`${message.guild.id}`)
            return;
        }
        servidores.set(`${message.guild.id}`, args[0]).then(
            message.channel.send(`Prefix changed correctly to \`${prefix}\``)
        );
    }
} 