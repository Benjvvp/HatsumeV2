module.exports = {
    name: "npmsearch",
    async run(message, args, client, lang) {
        const fetch = require('node-fetch')
        const {MessageEmbed, Util} = require('discord.js');

        if(!args.join(' ')){
            const embed = new MessageEmbed()
              .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
              .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
              .setDescription(client.languages.__({phrase: 'npmsearch.addpackage', locale: lang}))
              .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        const page = `https://www.npmjs.com/search/suggestions?q=${args.join(' ')}&size=1`;
        await fetch(page).then(async r => {
            const json = await r.json();
            if(!json.length){
                const embed = new MessageEmbed()
                  .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                  .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                  .setDescription(client.languages.__({phrase: 'npmsearch.packagenotfound', locale: lang}))
                  .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            const NPMEmbed = new MessageEmbed()
                .setDescription(`**[${json[0].name.toUpperCase()}](${json[0].links.npm})**\n\n${json[0].description.length ? json[0].description : 'No tiene'}`)
                .addField(client.languages.__({phrase: 'npmsearch.version', locale: lang}), `${json[0].version}`, true)
                .addField(client.languages.__({phrase: 'npmsearch.author', locale: lang}), `${json[0].author.name}`, true)
                .addField(client.languages.__({phrase: 'npmsearch.repository', locale: lang}), `[GitHub](${json[0].links.repository})`, true)
                .setFooter(`Tags: ${json[0].keywords.length ? json[0].keywords.join(', ') : 'No tiene'}`)
                .setColor('#e74c3c');
            await message.channel.send({ embeds: [new MessageEmbed(NPMEmbed)] });
            }).catch((err) => {
                const embed = new MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setDescription(client.languages.__mf({phrase: 'npmsearch.err', locale: lang}, {err: err}))
                .setColor("RED")
                return message.channel.send({embeds: [embed]})
            });
    }
}