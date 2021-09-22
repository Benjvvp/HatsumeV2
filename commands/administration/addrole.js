
const permissionAuth = require('../../handler/permissionAuth');

module.exports = {
    name: "addrole",
    async run(message, args, client) {
        const Discord = require('discord.js')
        
        let p = permissionAuth(message, 'MANAGE_ROLES')
        if(p === undefined || !p ) return;

        const user = message.mentions.members.first();
        const rol = message.mentions.roles.first();

        if(!user){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to mention `one person`.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(!rol){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**You need to mention a role.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }else if(!rol.editable){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**The role you want to add is higher than mine.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }else if(rol.comparePositionTo(message.member.roles.highest) > 0){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**The role you want to add is higher than yours.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }
        if(user.roles.cache.has(`${rol.id}`)){
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**This user already has the role.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        }

        user.roles.add(rol.id).catch(e => {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]})
        })

        const embedLock = new Discord.MessageEmbed()
        .setTitle('<a:checkgif:835970348687556645> `|` Role correctly added to ' + user.user.username + '.')
        .setColor('GREEN');
        message.channel.send({embeds: [embedLock]})
    }
}