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
        if (!args.length) return msg.channel.send("I need code to evaluate.")
        let code = args.join(' ');
        code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        let evaled;
        try {
            const start = process.hrtime();
            evaled = eval(code);
            if (evaled instanceof Promise) {
                evaled = await evaled;
            }
            const stop = process.hrtime(start)
            const response = [
                `**Output:** \`\`\`js\n${this.clean(util.inspect(evaled, { depth: 0 }))}\n\`\`\``,
                `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
                `**Time Taken** \`\`\`${(((stop[0] * 1e0) + stop[1])) / 1e6}ms \`\`\``
            ]
            const res = response.join('\n');
            if (res.length < 2000) {
                await msg.channel.send(res)
            } else {
                const output = new Discord.MessageAttachment(Buffer.from(res), 'output.txt');
                await msg.channel.send(output)
            }
        } catch (err) {
            return message.channel.send(`Error: \`\`\`xl\n${this.clean(err)}\`\`\``)
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