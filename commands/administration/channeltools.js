const permissionAuth = require('../../handler/permissionAuth');
const deletechannel = require('./utilHandler/deletechannel');
const renamechannel = require('./utilHandler/renamechannel');
const slowchannel = require('./utilHandler/slowchannel');

module.exports = {
    name: "channeltools",
    async run(message, args, client) {
        const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction, ContextMenuInteraction } = require('discord.js')
        let p = await permissionAuth(message, 'MANAGE_CHANNELS')
        if(p === undefined || !p ) return;

        /* Principal Embed */
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('deletechannel')
                .setLabel('Delete Channel')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('renamechannel')
                .setLabel('Rename Channel')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('slowmode')
                .setLabel('Slow Mode')
                .setStyle('SUCCESS'),
        )
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Channel Tools - Hatsume')
            .setDescription('You have invoked the Channel Tools command, this command will show you the options you have below to choose one just click and read what you will get later, thank you.\n**You have 10 seconds to choose.**')
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        
        message.channel.send({embeds: [embed], components: [row]}).then(msg => {
            /* Collector */
            const collector = msg.createMessageComponentCollector({time: 10000, max: 1});
            
            collector.on('collect', i => {
                if(i.user.id === message.author.id){
                    if (i.customId === 'deletechannel') {
                        deletechannel(message, msg);
                        i.deferUpdate()
                    }
                    if (i.customId === 'renamechannel') {
                        renamechannel(message, msg)
                        i.deferUpdate()
                    }
                    if (i.customId === 'slowmode') {
                        slowchannel(message, msg)
                        i.deferUpdate()
                    }
                }
            });
        })
        
    }
    
}