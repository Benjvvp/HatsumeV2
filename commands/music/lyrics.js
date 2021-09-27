module.exports = {
    name: "lyrics",
    async run(message, args, client, lang) {
        let guildQueue = await client.player.getQueue(message.guild.id);
        const {
            Util,
            MessageEmbed
        } = require('discord.js');
        const soleno = require('solenolyrics');

        const search = args.join(' ');

        if(guildQueue){
            const [lyrics, icon, title, author] = await Promise.all([

                soleno.requestLyricsFor(guildQueue.nowPlaying.name),
                soleno.requestIconFor(guildQueue.nowPlaying.name),
                soleno.requestTitleFor(guildQueue.nowPlaying.name),
                soleno.requestAuthorFor(guildQueue.nowPlaying.name)
            ]);
    
            const embed = new MessageEmbed()
                .setTitle(title)
                .setAuthor(author, icon)
                .setColor('RANDOM');
    
            for (const song of Util.splitMessage(lyrics)) {
                embed.setFooter(song);
                return message.channel.send({embeds: [embed]})
            }
            return;
        }

        if (!search) {
            const embed = new MessageEmbed()
              .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
              .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
              .setDescription(client.languages.__({phrase: 'lyrics.enternamesong', locale: lang}))
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