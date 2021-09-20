module.exports = {
    name: "donate",
    async run(message, args, client) {

        const Discord = require('discord.js');

        let embed = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTitle('¿ Could you help me ?')
        .setDescription("Hello, I hope you're well, I'll explain you look... I need help to be able to continue entertaining them since I can not alone I hope you can help me and I would appreciate it very much with benefits <3. \n **[Donate](https://patreon.com/join/Hatsume)**")
        .setImage('https://th.bing.com/th/id/Re7005de6727bd263cc8b61cc129e95e6?rik=qkMucJRjDXo4GQ&riu=http%3a%2f%2fstatic.tumblr.com%2f2v7rlu2%2flmjm1gmyc%2fhatsune_miku.gif&ehk=mVT1f2n1bBbn7IMvlZMW12DJ643khe0valTejyz4GMI%3d&risl=&pid=ImgRaw')
        message.channel.send({embeds: [embed]})
    }
}