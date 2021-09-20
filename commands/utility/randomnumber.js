module.exports = {
    name: "randomnumber",
    async run(message, args, client) {

        const Discord = require('discord.js');
        if(!args[0]){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Please enter from which number up to which number you want to be the `random number`. `Usage: $$RandomNumber <from> <to>`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!args[1]){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You are missing the second number that decides `how far the random number will go`. `Usage: $$RandomNumber <from> <to>`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let de = args[0]
        let hasta = args[1]
        const random = Math.floor((Math.random() * hasta) + de);

        let embed = new Discord.MessageEmbed()
        .setTitle("¡ Random Number ! 🎁")
        .setDescription(`**The random number between ${de} y ${hasta} is: ${random}.**`)
        .setColor('AQUA')
        message.channel.send({embeds: [embed]})
    }
}