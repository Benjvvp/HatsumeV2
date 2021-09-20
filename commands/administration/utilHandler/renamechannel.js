const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction } = require('discord.js')
module.exports = async (message, msg) => {
    
    /* Delete Channel DOM  */
    const embedRenameChannel = new MessageEmbed()
        .setTitle('Then type the new channel name')
        .setColor('RED')


    const rowRenameChannel = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('renamechannelcancel')
                .setLabel('Cancel')
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
            .setTitle('<a:checkgif:835970348687556645> `|` The channel has been renamed correctly.')
            .setColor('GREEN');
        message.channel.send({embeds: [embed]})
    })  
    newChannelName.on('end', collected => {
        if(collected.size == 0){
            msg.delete()
            const embed = new MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You did not enter the name and the time has expired, to retry enter the command again.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
    })
}