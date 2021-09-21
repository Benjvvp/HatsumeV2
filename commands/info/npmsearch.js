module.exports = {
    name: "npmsearch",
    async run(message, args, client) {
        const fetch = require('node-fetch')
        const {MessageEmbed, Util} = require('discord.js');

        if(!args.join(' ')){
            const embed = new MessageEmbed()
              .setAuthor(`❌ ¡ There's a mistake !`)
              .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
              .setDescription("**You must add the package to search.**")
              .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        const page = `https://www.npmjs.com/search/suggestions?q=${args.join(' ')}&size=1`;
        await fetch(page).then(async r => {
            const json = await r.json();
            if(!json.length){
                const embed = new MessageEmbed()
                  .setAuthor(`❌ ¡ There's a mistake !`)
                  .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                  .setDescription("**The package was not found.**")
                  .setColor("RED")
                return message.channel.send({embeds: [embed]})
            }
            const NPMEmbed = new MessageEmbed()
                .setDescription(`**[${json[0].name.toUpperCase()}](${json[0].links.npm})**\n\n${json[0].description.length ? json[0].description : 'No tiene'}`)
                .addField('**Version**', `${json[0].version}`, true)
                .addField('**Author**', `${json[0].author.name}`, true)
                .addField('**Repository**', `[GitHub](${json[0].links.repository})`, true)
                .setFooter(`Tags: ${json[0].keywords.length ? json[0].keywords.join(', ') : 'No tiene'}`)
                .setColor('#e74c3c');
            await message.channel.send({ embeds: [new MessageEmbed(NPMEmbed)] });
            }).catch((err) => {
                const embed = new MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setDescription(`**An error occurred while consulting the NPMs.\nError: **` + err)
                .setColor("RED")
                return message.channel.send({embeds: [embed]})
            });
    }
}