const permissionAuth = require('../../handler/permissionAuth');
const deletechannel = require('./utilHandler/deletechannel');
const renamechannel = require('./utilHandler/renamechannel');
const slowchannel = require('./utilHandler/slowchannel');

module.exports = {
    name: "channeltools",
    async run(message, args, client, lang) {
        const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction, ContextMenuInteraction } = require('discord.js')
        let p = await permissionAuth(message, 'MANAGE_CHANNELS')
        if(!p === undefined || p ) return;

        /* Principal Embed */
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('deletechannel')
                .setLabel(client.languages.__({phrase: 'channeltools.deletechannel', locale: lang}))
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('renamechannel')
                .setLabel(client.languages.__({phrase: 'channeltools.renamechannel', locale: lang}))
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('slowmode')
                .setLabel(client.languages.__({phrase: 'channeltools.slowmode', locale: lang}))
                .setStyle('SUCCESS'),
        )
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('Channel Tools - Hatsume')
            .setDescription(client.languages.__({phrase: 'channeltools.embeddescription', locale: lang}))
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        
        message.channel.send({embeds: [embed], components: [row]}).then(msg => {
            /* Collector */
            const collector = msg.createMessageComponentCollector({time: 10000, max: 1});
            
            collector.on('collect', i => {
                if(i.user.id === message.author.id){
                    if (i.customId === 'deletechannel') {
                        deletechannel(message, msg, lang, client);
                        i.deferUpdate()
                    }
                    if (i.customId === 'renamechannel') {
                        renamechannel(message, msg, lang, client)
                        i.deferUpdate()
                    }
                    if (i.customId === 'slowmode') {
                        slowchannel(message, msg, lang, client)
                        i.deferUpdate()
                    }
                }
            });
        })
        
    }
    
}