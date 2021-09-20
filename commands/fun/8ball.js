module.exports = {
    name: "8ball",
    run(message, args, client){

    const Discord = require('discord.js');

    let respuesta = ["Yes", "No", "Maybe", "Obvious", "I say yes", "I say no", "Probably"]
    var random = respuesta[Math.floor(Math.random() * respuesta.length)]

    if (args.join(" ").length < 5){
        const embed = new Discord.MessageEmbed()
        .setAuthor(`❌ ¡ There's a mistake !`)
        .setDescription('**You need to add a longer question. __Tiene have to be greater than 5 caracteres.__**')
        .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
        .setColor("RED")
        return message.channel.send({embeds: [embed]})
    }
    const embed = new Discord.MessageEmbed()
    .setTitle("8Ball | Hatsume")
    .setThumbnail(client.user.avatarURL())
    .addField("To your question", `${args.join(" ")}`)
    .addField("My answer", `${random}`)
    .setColor("GREEN")
    message.channel.send({embeds: [embed]})

    }
}