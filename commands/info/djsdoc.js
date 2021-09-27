module.exports = {
    name: "djsdoc",
    async run(message, args, client, lang) {
        const fetch = require('node-fetch')
        const {MessageEmbed} = require('discord.js');

        if(!args.join(' ')){
            const embed = new MessageEmbed()
              .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
              .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
              .setDescription(client.languages.__({phrase: 'djsdoc.entersearch', locale: lang}))
              .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        let src = "";
        let cont = "";
        if (["stable", "master", "commando", "rpc", "akairo", "akairo-master", "collection"].includes(args[1]?.toLowerCase())) {
        src = args[1];
        cont = args.slice(2).join(" ");
        } else {
        src = "stable";
        cont = args.slice(1).join(" ");
        }
        const page = `https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(src)}&q=${encodeURIComponent(cont)}`;
        await fetch(page).then(async r => {
        const res = await r.json();
        if (res.error) return message.channel.send({ embeds: [new MessageEmbed().setTitle("Error " + res.status).setDescription(res.error + ": " + res.message)] });
        await message.channel.send({ embeds: [new MessageEmbed(res)] });
        }).catch((err) => {
            const embed = new MessageEmbed()
              .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
              .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
              .setDescription(client.languages.__mf({phrase: 'djsdoc.cases', locale: lang}, {err: err.message}))
              .setColor("RED")
            return message.channel.send({embeds: [embed]})
        });
    }
}