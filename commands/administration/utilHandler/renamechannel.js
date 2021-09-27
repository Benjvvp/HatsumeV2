const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction } = require('discord.js')
module.exports = async (message, msg, lang, client) => {
    /* Delete Channel DOM  */
    const embedRenameChannel = new MessageEmbed()
        .setTitle(client.languages.__({phrase: 'renamechannel.typechannel', locale: lang}))
        .setColor('RED')


    const rowRenameChannel = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('renamechannelcancel')
                .setLabel(client.languages.__({phrase: 'renamechannel.cancel', locale: lang}))
                .setStyle('DANGER'),
            )

    msg.edit({embeds: [embedRenameChannel], components: [rowRenameChannel]}).then(msg => {
        const collector = msg.createMessageComponentCollector({time: 10000, max: 1});
        collector.on('collect', i => {
            if(i.user.id === message.author.id){
                if (i.customId === 'renamechannelcancel') {
                    msg.delete()
                }
            }
        });
    })

    const filter = x => {
        return (x.author.id === message.author.id)
    }
    const newChannelName = message.channel.createMessageCollector({filter, max: 1, time: 10000});
    
    newChannelName.on('collect', m => {
        message.channel.setName(m.content)
        const embed = new MessageEmbed()
            .setTitle(client.languages.__({phrase: 'renamechannel.sucessrename', locale: lang}))
            .setColor('GREEN');
        message.channel.send({embeds: [embed]})
    })  
    newChannelName.on('end', collected => {
        if(collected.size == 0){
            msg.delete()
            const embed = new MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: lang}))
                .setDescription(client.languages.__({phrase: 'renamechannel.endcollectorerror', locale: guild.lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
    })
}