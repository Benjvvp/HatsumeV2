const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction } = require('discord.js')
module.exports = async (message, msg) => {
    /* Delete Channel DOM  */
    const embedDeleteChannel = new MessageEmbed()
        .setTitle('Are you sure?')
        .setColor('RED')


    const rowDeleteChannel = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('deletechannelyes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('deletechannelno')
                .setLabel('No')
                .setStyle('DANGER'),
            )

    msg.edit({embeds: [embedDeleteChannel], components: [rowDeleteChannel]}).then(msg => {
    const collector = msg.createMessageComponentCollector({time: 20000, max: 1});
    collector.on('collect', i => {
        if(i.user.id === message.author.id){
            if (i.customId === 'deletechannelyes') {
                message.channel.delete()
            }
            if (i.customId === 'deletechannelno') {
                msg.delete()
            }
        }
    });
    })
}