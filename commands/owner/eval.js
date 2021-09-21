module.exports = {
    name: "eval",
    async run(message, args, client) {
        require('dotenv').config()
        const Discord = require('discord.js');
        const { Type } = require('@extreme_hero/deeptype')
        var util = require('util');

        const ownerID = "786271962065272864";
        if (message.author.id !== ownerID) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Only the creator of the bot can execute this command.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        const msg = message;
        if (!args.length){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**I need code to evaluate.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        let code = args.join(' ');
        code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        let evaled;
        try {
            evaled = eval(code);
            if (evaled instanceof Promise) {
                evaled = await evaled;
            }
            const embed = new Discord.MessageEmbed()
            .setTitle('Eval')
            .addField('<a:REDARROWHATSUME:889867722178068530> **`Input`**', `\`\`\`js\n${this.clean(args.join(' '))}\n\`\`\``)
            .addField('<a:GREENARROWHATSUME:889867721750224967> **`Output`**', `\`\`\`js\n${this.clean(util.inspect(evaled, { depth: 0 }))}\n\`\`\``)
            .addField('<:FOLDERHATSUME:889867722270343269> **`Type`**', `\`\`\`ts\n${new Type(evaled).is}\n\`\`\``)
            .setColor('GREEN')
            message.channel.send({embeds: [embed]})
        } catch (err) {
            const embed = new Discord.MessageEmbed()
                .setTitle('Eval error')
                .addField('<a:REDARROWHATSUME:889867722178068530> **`Input`**', `\`\`\`js\n${this.clean(args.join(' '))}\n\`\`\``)
                .addField('<a:GREENARROWHATSUME:889867721750224967> **`Output`**', `\`\`\`xl\n${this.clean(err)}\`\`\``)
                .addField('<:FOLDERHATSUME:889867722270343269> **`Type`**', `\`\`\`ts\n${new Type(evaled).is}\n\`\`\``)
                .setColor('RED')
            message.channel.send({embeds: [embed]})
        }
    },
    clean(text) {
        if (typeof text === 'string') {
            text = text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`)
                .replace(new RegExp(process.env.TOKEN, 'gi'), '****')
        }
        return text;
    }
};