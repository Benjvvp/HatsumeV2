const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "unlock",
    async run(message, args, client) {
        const Discord = require('discord.js')
        
        permissionAuth(message, 'MANAGE_CHANNELS')

        let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone');

        let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!lockChannel) lockChannel = message.channel;

        await lockChannel.permissionOverwrites.edit(alluser, {
            SEND_MESSAGES: true
        }).catch(console.error())

        const embedLock = new Discord.MessageEmbed()
        .setTitle('<a:checkgif:835970348687556645> `|` The channel has been unblocked and anyone can now write to.')
        .setColor('GREEN');
        message.channel.send({embeds: [embedLock]})
    }
}