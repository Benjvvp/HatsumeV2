const { MessageActionRow, MessageButton, MessageEmbed, ButtonInteraction } = require('discord.js')
module.exports = async (message, msg) => {

    const Discord = require('discord.js');
    const ms = require('ms');

    /* Delete Channel DOM  */
    const embedSlowChannel = new MessageEmbed()
        .setTitle('Then, insert the time you want or if you want to deactivate it (off).')
        .setColor('RED')
    const embedSlowON = new MessageEmbed()
        .setTitle('Insert the time in seconds - Example: 50s.')
        .setColor('RED')
    const rowSlowON = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('slowmodecancel')
        .setLabel('Cancel')
        .setStyle('DANGER'),
    )
    const rowSlowChannel = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('slowmodeon')
                .setLabel('On')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('slowmodeoff')
                .setLabel('Off')
                .setStyle('DANGER'),
            )

    msg.edit({embeds: [embedSlowChannel], components: [rowSlowChannel]}).then(msg => {
        const collector = msg.createMessageComponentCollector({time: 10000, max: 1});
        collector.on('collect', i => {
            if(i.user.id === message.author.id){
                if (i.customId === 'slowmodeoff') {
                    message.channel.setRateLimitPerUser(0)
                    const embed = new MessageEmbed()
                        .setTitle('<a:checkgif:835970348687556645> `|` It has been deactivated correctly.')
                        .setColor('GREEN');
                    message.channel.send({embeds: [embed]})
                    msg.delete()
                    return;
                }
                if (i.customId === 'slowmodeon') {
                    i.deferUpdate()
                    msg.edit({embeds: [embedSlowON], components: [rowSlowON]}).then(msg => {
                        const collector = msg.createMessageComponentCollector({time: 10000, max: 1});
                        collector.on('collect', i => {
                            if(i.user.id === message.author.id){
                                if(i.customId === 'slowmodecancel') msg.delete();
                            }
                        })
                    })
                    const filter = x => {
                        return (x.author.id === message.author.id)
                    }
                    const slowTimeCollector = message.channel.createMessageCollector({filter, max: 1, time: 10000});
                    
                    slowTimeCollector.on('collect', async m => {
                        let convert = ms(`${m.content}`)
                        let toSecond = Math.floor(convert / 1000);//convertimos el time en segundos
                        if (!toSecond || toSecond == undefined) {
                            msg.delete()
                            const embed = new Discord.MessageEmbed()
                                .setAuthor(`❌ ¡ There's a mistake !`)
                                .setDescription('**Please insert a `valid format`, try again.**')
                                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                                .setColor("RED")
                            return message.channel.send({embeds: [embed]})
                        }
                        await message.channel.setRateLimitPerUser(toSecond);
                        const embed = new MessageEmbed()
                            .setTitle('<a:checkgif:835970348687556645> `|` Slow mode set correctly.')
                            .setColor('GREEN');
                        message.channel.send({embeds: [embed]})
                    })  
                    slowTimeCollector.on('end', collected => {
                        if(collected.size == 0){
                            msg.delete()
                            const embed = new MessageEmbed()
                                .setAuthor(`❌ ¡ There's a mistake !`)
                                .setDescription('**You did not enter the name and the time has expired, to retry enter the command again.**')
                                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                                .setColor("RED")
                            return message.channel.send({embeds: [embed]})
                        }
                    })
                }
            }
            return;
        });
    })
}