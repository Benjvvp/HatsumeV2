module.exports = {
    name: "lyrics",
    async run(message, args, client) {
        const {
            Util,
            MessageEmbed
        } = require('discord.js');
        const soleno = require('solenolyrics');

        const search = args.join(' ');

        if (!search) {
            const embed = new MessageEmbed()
              .setAuthor(`❌ ¡ There's a mistake !`)
              .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
              .setDescription("**Enter the name of the song. `Usage: $$lyrics [Song]`**")
              .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }


        const [lyrics, icon, title, author] = await Promise.all([

            soleno.requestLyricsFor(search),
            soleno.requestIconFor(search),
            soleno.requestTitleFor(search),
            soleno.requestAuthorFor(search)
        ]);

        const embed = new MessageEmbed()
            .setTitle(title)
            .setAuthor(author, icon)
            .setColor('RANDOM');

        for (const song of Util.splitMessage(lyrics)) {
            embed.setFooter(song);
            return message.channel.send({embeds: [embed]})
        }
    }
};