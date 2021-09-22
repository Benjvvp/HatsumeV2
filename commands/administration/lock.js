const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "lock",
    async run(message, args, client) {
        const Discord = require('discord.js')
        
        let p = await permissionAuth(message, 'MANAGE_CHANNELS')
        if(!p.embeds.MessageEmbed) return;
        
        let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone');

        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!lockChannel) lockChannel = message.channel;

        await lockChannel.permissionOverwrites.edit(alluser, {
            READ_MESSAGE_HISTORY: true,
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
        }).catch(console.error())

        const embedLock = new Discord.MessageEmbed()
        .setTitle('<a:checkgif:835970348687556645> `|` The channel has been blocked.')
        .setColor('GREEN');
        message.channel.send({embeds: [embedLock]})
    }
}