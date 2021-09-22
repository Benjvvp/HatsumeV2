const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "setnick",
    async run(message, args, client) {
        const Discord = require('discord.js')
        
        let p = permissionAuth(message, 'MANAGE_NICKNAMES')
        if(!p === undefined || p ) return;
        
        let user = message.mentions.members.first();
        const newName = args.splice(1).join(' ')

        if (!user) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Please mention the user.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        if (!newName) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Please enter the new user name.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send({embeds: [embed]})
        }
        if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You cannot change the nickname to a user with a higher role level than you.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        
        user.setNickname(newName)
        const embedLock = new Discord.MessageEmbed()
            .setTitle('<a:checkgif:835970348687556645> `|` User name changed correctly.')
            .setColor('GREEN');
        message.channel.send({embeds: [embedLock]})
    }
}