module.exports = {
    name: "ohno",
    async run(message, args, client) {

        const canva = require("canvacord");
        const Discord = require("discord.js");

        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Please enter the text. `Usage: $$ohno [Text]`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let image = await canva.Canvas.ohno(args.join(' '));

        let attachment = await new Discord.MessageAttachment(image);

        message.channel.send({files: [attachment]});
    }
}