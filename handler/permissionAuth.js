module.exports = async (message, permissionString) => {
    const { MessageEmbed } = require('discord.js')

    if (!message.guild.me.permissions.has(`${permissionString}`)){
        const embed = new MessageEmbed()
            .setAuthor(`❌ ¡ There's a mistake !`)
            .setDescription('**I need the necessary permissions to execute this command. `'+`${permissionString}` +'`**')
            .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
            .setColor("RED")
        return message.channel.send({embeds: [embed]});
    }
    if (!message.member.permissions.has(`${permissionString}`)) {
        const embed = new MessageEmbed()
            .setAuthor(`❌ ¡ There's a mistake !`)
            .setDescription('**You do not have the necessary permission to execute this command. `'+`${permissionString}`+'`**')
            .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
            .setColor("RED")
        return message.channel.send({embeds: [embed]})
    }
}