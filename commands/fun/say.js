module.exports = {
    name: "say",
    run(message, args, client) {
  
      const Discord = require('discord.js');
      texto = args.join(" ")
      for (let i = 0; texto.includes("@here") || texto.includes("@everyone"); i++) {
        texto = texto.replace(/@here/g, "here");
        texto = texto.replace(/@everyone/g, "everyone");
      }
      if (!texto) {
        const embed = new Discord.MessageEmbed()
          .setAuthor(`❌ ¡ There's a mistake !`)
          .setDescription('**You need to `write` something.**')
          .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
          .setColor("RED")
        return message.channel.send({embeds: [embed]})
      }
      message.channel.send(texto)
    }
  }