module.exports = {
    name: "calculate",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');
        const math = require("math-expression-evaluator"); // Este NPM es con el que se podrá hacer los calculos


        const embed = new Discord.MessageEmbed()
            .setColor(`RANDOM`);

        if (!args[0]){
            const embed = new Discord.MessageEmbed()
            .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
            .setDescription(client.languages.__({phrase: 'calculate.enterexpression', locale: lang}))
            .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
            .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        let resultado;
        try {
            resultado = math.eval(args.join(" ")); // El Args toma el calculo
        } catch (e) {
            resultado = client.languages.__({phrase: 'calculate.error', locale: lang}); // Cuando es incorrecta
        }
        embed.addField(client.languages.__({phrase: 'calculate.input', locale: lang}), `\`\`\`js\n${args.join(" ")}\`\`\``, false) // Te da el calculo
            .setTitle(client.languages.__({phrase: 'calculate.title', locale: lang}))
            .addField(client.languages.__({phrase: 'calculate.output', locale: lang}), `\`\`\`js\n${resultado}\`\`\``, false);
        await message.channel.send({embeds: [embed]});
    }
}