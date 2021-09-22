const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "clear",
    async run(message, args, client) {

        message.delete();
        
        let p = await permissionAuth(message, 'MANAGE_MESSAGES')
        if(!p === undefined || p ) return;
        
        if (!args[0])
            return message.channel.send(`Please Give Me An Amount.`);

        if (args[0] > 100)//Esto no lo modifiquen
            return message.channel.send(
                `I cannot delete more than 100 messages ${args[0]} is the discord limit`
            );

        message.channel.bulkDelete(args[0])
    }
}