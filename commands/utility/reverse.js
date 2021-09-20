module.exports = {
    name: "reverse",
    async run(message, args, client) {

        const Discord = require('discord.js');
        
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Please enter the `text`. `Usage: $$reverse <Text>`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let embed1 = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setDescription(`**Entered Text: \`\`${args.join(" ")}\`\` \n Output: \`\`${args.join(" ").split('').reverse().join('')}\`\` **`)
        .setColor('AQUA')
        message.channel.send({embeds: [embed1]})
    }
}