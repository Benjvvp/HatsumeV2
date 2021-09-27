const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction } = require('discord.js')
module.exports = async (message, msg) => {
    const {guild} = message;

    /* Delete Channel DOM  */
    const embedDeleteChannel = new MessageEmbed()
        .setTitle(client.languages.__({phrase: 'deletechannel.areyousure', locale: guild.lang}))
        .setColor('RED')


    const rowDeleteChannel = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('deletechannelyes')
                .setLabel(client.languages.__({phrase: 'deletechannel.yes', locale: guild.lang}))
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('deletechannelno')
                .setLabel(client.languages.__({phrase: 'deletechannel.no', locale: guild.lang}))
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