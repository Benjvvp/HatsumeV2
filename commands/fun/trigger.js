module.exports = {
    name: "trigger",
    async run(message, args, client) {

        const canva = require("canvacord");
        const Discord = require("discord.js");

        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

        let image = await canva.Canvas.trigger(avatar);

        let attachment = new Discord.MessageAttachment(image, "triggered.gif");

        return message.channel.send({files: [attachment]});
    }
}