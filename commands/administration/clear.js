const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "clear",
    async run(message, args, client, lang) {

        message.delete();
        
        let p = await permissionAuth(message, 'MANAGE_MESSAGES')
        if(!p === undefined || p ) return;
        
        if (!args[0])
            return message.channel.send(client.languages.__({phrase: 'clear.giveamount', locale: lang}));

        if (args[0] > 100)//Esto no lo modifiquen
            return message.channel.send(client.languages.__({phrase: 'clear.error100msg', locale: lang}));

        message.channel.bulkDelete(args[0])
    }
}