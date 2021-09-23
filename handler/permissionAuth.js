module.exports = async (message, permissionString) => {
    const { MessageEmbed } = require('discord.js')
    const lang = message.guild.lang;

    if (!message.guild.me.permissions.has(`${permissionString}`)){
        const embed = new MessageEmbed()
            .setAuthor(client.languages.__mf({phrase: 'embederror.title', locale: lang}, {permissionString: permissionString}))
            .setDescription(client.languages.__({phrase: 'permissionAuth.bot_description', locale: lang}))
            .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
            .setColor("RED")
        return message.channel.send({embeds: [embed]});
    }
    if (!message.member.permissions.has(`${permissionString}`)) {
        const embed = new MessageEmbed()
            .setAuthor(client.languages.__mf({phrase: 'embederror.title', locale: lang}, {permissionString: permissionString}))
            .setDescription(client.languages.__({phrase: 'permissionAuth.user_description', locale: lang}))
            .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
            .setColor("RED")
        return message.channel.send({embeds: [embed]})
    }
}