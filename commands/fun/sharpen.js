module.exports = {
    name: "sharpen",
    async run(message, args, client, lang) {

        const canva = require("canvacord");
        const Discord = require("discord.js");

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

        let image = await canva.Canvas.sharpen(avatar, 5);

        let attachment = await new Discord.MessageAttachment(image, "triggered.gif");

        return message.channel.send({files: [attachment]});
    }
}