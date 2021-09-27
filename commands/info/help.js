module.exports = {
    name: "help",
    run(message, args, client, lang) {

        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail("http://millingtonlibrary.info/wp-content/uploads/2015/02/Info-I-Logo.png")
            .setTitle(client.languages.__({phrase: 'help.title', locale: lang}))
            .addField(client.languages.__({phrase: 'help.description', locale: lang}), "**---------------------------------------------------------**")
            .addField(client.languages.__({phrase: 'help.creator', locale: lang}), "_benjvvp#3141", false)
            .addField(client.languages.__({phrase: 'help.prefix', locale: lang}), "$$", false)
            .addField(client.languages.__({phrase: 'help.version', locale: lang}), `1.2 \n \n[${client.languages.__({phrase: 'help.invitation', locale: lang})}](https://discord.com/api/oauth2/authorize?client_id=874827585417248779&permissions=8&scope=bot)**  \`||\`  **[${client.languages.__({phrase: 'help.donation', locale: lang})}](https://patreon.com/join/Hatsume)**  \`||\`  **[${client.languages.__({phrase: 'help.support', locale: lang})}](https://discord.gg/zm3Ggsg4Fd)`, false)
            .setColor('#42bf91')
        message.channel.send({embeds: [embed]})

    }
}