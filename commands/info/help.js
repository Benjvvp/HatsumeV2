module.exports = {
    name: "help",
    run(message, args, client) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail("http://millingtonlibrary.info/wp-content/uploads/2015/02/Info-I-Logo.png")
            .setTitle("Information")
            .addField("**Hello my name is Hatsume and I am a MultiFunctional bot created very recently, I hope to serve you and entertain you a lot <3.\n\nTo find the list of commands enter: `$$Commands`**", "**---------------------------------------------------------**")
            .addField("<:code:835987328047644682> Creador", "_benjvvp#9999", false)
            .addField("<a:loadingc:888572991196246037> Prefix", "$$", false)
            .addField("<:bottag:835987716994498560> Version", "1.1 \n \n[**Invitation**](https://discord.com/api/oauth2/authorize?client_id=874827585417248779&permissions=8&scope=bot)**  `||`  **[**Donations**](https://patreon.com/join/Hatsume)**  `||`  **[**Support**](https://discord.gg/yvqtBB9QW2)", false)
            .setColor('#42bf91')
        message.channel.send({embeds: [embed]})

    }
}