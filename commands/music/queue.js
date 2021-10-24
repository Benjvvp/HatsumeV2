const {MessageActionRow, MessageEmbed, MessageButton} = require('discord.js');
module.exports = {
    name: "queue",
    async run(message, args, client, lang) {
        const guildQueue = client.distube.getQueue(message);

        let currentPage = 0;
        const embeds = generateQueueEmbeds(guildQueue.songs)
        if(!message.member.voice.channel){
            const embed = new MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'musicgeneral.entervoice', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id){
            const embed = new MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'musicgeneral.anotherchannel', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!guildQueue.playing){
            const embed = new MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'musicgeneral.notreproducing', locale: lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        
        const rowOptions = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('previouslist')
                .setLabel('⏪')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('nextlist')
                .setLabel('⏩')
                .setStyle('SUCCESS'),
        )
  
        const rowOptionsDisabled = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('previouslist')
                .setLabel('⏪')
                .setStyle('SUCCESS')
                .setDisabled(true),
            new MessageButton()
                .setCustomId('nextlist')
                .setLabel('⏩')
                .setStyle('SUCCESS')
                .setDisabled(true),
        )

        const queueEmbed = await message.channel.send({embeds: [embeds[currentPage]], components: [rowOptions]})

        const filter = (interaction) => {
            if(interaction.user.id === message.author.id) return true;
        };

        const collector = queueEmbed.createMessageComponentCollector({filter, time: 30000});

        collector.on('collect', i => {
            i.deferUpdate()
            if(i.user.id === message.author.id){
                if (i.customId === 'nextlist') {
                    if(currentPage < embeds.length-1){
                        currentPage++;
                        queueEmbed.edit({embeds: [embeds[currentPage]], components: [rowOptions]});
                    }
                }
                if (i.customId === 'previouslist') {
                    if(currentPage !== 0){
                        --currentPage;
                        queueEmbed.edit({embeds: [embeds[currentPage]], components: [rowOptions]})
                    }
                }
            }
        });
        collector.on('end', i => {
            queueEmbed.edit({embeds: [embeds[currentPage]], components: [rowOptionsDisabled]})
        })

        function generateQueueEmbeds(queue){
            const embeds = [];
            let k = 10;
            for(let i = 0; i < queue.length; i += 10){
                const current = queue.slice(i, k);
                let j = i;
                k += 10;
                const embed = new MessageEmbed()
                .setDescription(current.map(track => `**${++j}) ${track.name}**`).join('\n'))
                .setColor('AQUA')
                embeds.push(embed)
            }
            return embeds;
        }
    }
}