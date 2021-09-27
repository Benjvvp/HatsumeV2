module.exports = {
    name: "8ball",
    run(message, args, client, lang){

    const Discord = require('discord.js');
    const yes = client.languages.__({phrase: '8ball.yes', locale: lang});
    const no = client.languages.__({phrase: '8ball.no', locale: lang});
    const maybe = client.languages.__({phrase: '8ball.maybe', locale: lang});
    const obvius = client.languages.__({phrase: '8ball.obvius', locale: lang});
    const isayyes = client.languages.__({phrase: '8ball.isayyes', locale: lang});
    const isayno = client.languages.__({phrase: '8ball.isayno', locale: lang});
    const probably = client.languages.__({phrase: '8ball.probably', locale: lang});

    let respuesta = [yes, no, maybe, obvius, isayyes, isayno, probably]
    var random = respuesta[Math.floor(Math.random() * respuesta.length)]

    if (args.join(" ").length < 5){
        const embed = new Discord.MessageEmbed()
        .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
        .setDescription(client.languages.__({phrase: '8ball.errorlength', locale: lang}))
        .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
        .setColor("RED")
        return message.channel.send({embeds: [embed]})
    }
    const embed = new Discord.MessageEmbed()
    .setTitle("8Ball | Hatsume")
    .setThumbnail(client.user.avatarURL())
    .addField(client.languages.__({phrase: '8ball.toyourq', locale: lang}), `${args.join(" ")}`)
    .addField(client.languages.__({phrase: '8ball.myanswer', locale: lang}), `${random}`)
    .setColor("GREEN")
    message.channel.send({embeds: [embed]})

    }
}