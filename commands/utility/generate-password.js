module.exports = {
    name: "generate-password",
    async run(message, args, client, lang) {
        const Discord = require('discord.js')
    
        if(!args[0]){
            const embed = new Discord.MessageEmbed()
            .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
            .setDescription(client.languages.__({phrase: 'generatepassword.enterlength', locale: lang}))
            .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
            .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }

        var abecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A", "B", "C" ,"D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];


        var numero = parseInt(args[0]);
        var numeroAleatorio = 3;
        let password = "";
        // paso 2 - escribir x caracteres

        for(var i = 0; i<numero; i++){
            numeroAleatorio = parseInt(Math.random()*abecedario.length); 
            password += (abecedario[numeroAleatorio]);
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(client.languages.__({phrase: 'generatepassword.sucessgenerate', locale: lang}))
        .setDescription(client.languages.__({phrase: 'generatepassword.description', locale: lang}))
        .setTimestamp()
        .setColor("#42bf91")
        message.channel.send({embeds: [embed]});
        message.author.send(client.languages.__mf({phrase: 'generatepassword.mdtext', locale: lang}, {password: password}))
        
    }
}