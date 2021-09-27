module.exports = {
    name: "shit",
    async run(message, args, client, lang) {

        const canva = require("canvacord");
        const Discord = require("discord.js");

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; //definimos user

        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' }); // Decimos que la imagen sea estatica y no un gif

        let image = await canva.Canvas.shit(avatar);

        let attachment = await new Discord.MessageAttachment(image);

        return message.channel.send({files: [attachment]});
    }
}