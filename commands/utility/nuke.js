const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "nuke",
    async run(message, args, client) {

        const Discord = require('discord.js');
        permissionAuth(message, 'MANAGE_CHANNELS')
        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete()

            ch.send('**This channel has been nuked**').then(x => x.delete({ timeout: 5000 }));
        });
    }
}