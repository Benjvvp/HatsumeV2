const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "nuke",
    async run(message, args, client, lang) {

        const Discord = require('discord.js');
        let p = await permissionAuth(message, 'MANAGE_CHANNELS')
        if(!p === undefined || p ) return;
        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parent.id);
            ch.setPosition(message.channel.position);
            message.channel.delete()

            ch.send(client.languages.__({phrase: 'nuke.sucess', locale: lang})).then(x => x.delete({ timeout: 5000 }));
        });
    }
}