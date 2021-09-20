module.exports = {
    name: "trash",
    async run(message, args, client) {

        const canva = require("canvacord");
        const Discord = require("discord.js");
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; //definimos user

        let avatar = user.displayAvatarURL({dynamic: false, format: 'png'}); // Decimos que la imagen sea estatica y no un gif

        //creamos un let        
        let image = await canva.Canvas.trash(avatar); // llamamos al let avatar
        
        let attachment = await new Discord.MessageAttachment(image, "trash.png") //llamamos a la imagen "trash.png"
        message.channel.send({files: [attachment]}); // mandamos el mensaje
        
    }
}