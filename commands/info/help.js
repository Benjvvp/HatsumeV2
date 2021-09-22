module.exports = {
    name: "help",
    run(message, args, client) {

        const Discord = require('discord.js');
        if (!message.guild.me.permissions.has(`USE_EXTERNAL_EMOJIS`)){
            const embed = new MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**I need the necessary permissions to execute this command. `'+`USE_EXTERNAL_EMOJIS` +'`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]});
        }
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setThumbnail("http://millingtonlibrary.info/wp-content/uploads/2015/02/Info-I-Logo.png")
            .setTitle("Information")
            .addField("**Hello my name is Hatsume and I am a MultiFunctional bot created very recently, I hope to serve you and entertain you a lot <3.\n\nTo find the list of commands enter: `$$Commands`**", "**---------------------------------------------------------**")
            .addField("<:code:835987328047644682> Creador", "_benjvvp#9999", false)
            .addField("<a:loadingc:888572991196246037> Prefix", "$$", false)
            .addField("<:bottag:835987716994498560> Version", "1.1 \n \n[**Invitation**](https://discord.com/api/oauth2/authorize?client_id=874827585417248779&permissions=8&scope=bot)**  `||`  **[**Donations**](https://patreon.com/join/Hatsume)**  `||`  **[**Support**](https://discord.gg/zm3Ggsg4Fd)", false)
            .setColor('#42bf91')
        message.channel.send({embeds: [embed]})

    }
}