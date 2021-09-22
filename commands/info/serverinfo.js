module.exports = {
    name: "serverinfo",
    async run(message, args, client) {
        const Discord = require('discord.js');
        const server = message.guild;
        if (!message.guild.me.permissions.has(`USE_EXTERNAL_EMOJIS`)){
            const embed = new MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**I need the necessary permissions to execute this command. `'+`USE_EXTERNAL_EMOJIS` +'`**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]});
        }
        let boostlevel = {
            NONE: 'Without boost',
            TIER_1: 'Boost level 1',
            TIER_2: 'Boost level 2',
            TIER_3: 'Boost level 3'
        }
        let roleadmin;
        server.roles.cache.find(role => {
            if(role.permissions.has('ADMINISTRATOR')) ++roleadmin
        })
        let owner = await server.fetchOwner();

        const embed = new Discord.MessageEmbed() 
            .addField('**Server information**', `
            > <:bluepoint:889915814684278784> **Name:** ${server.name}
            > <:bluepoint:889915814684278784> **ID:** ${server.id}
            > <:bluepoint:889915814684278784> **Creation:** ${server.createdAt.toDateString().split(" ")[2]}/${server.createdAt.toDateString().split(" ")[1]}/${server.createdAt.toDateString().split(" ")[3]}
            > <:bluepoint:889915814684278784> **Boost level:** ${boostlevel[server.premiumTier]}
            > <:bluepoint:889915814684278784> **Region:** ${server.preferredLocale}
            > <:bluepoint:889915814684278784> **Users:** ${server.memberCount}`, false)
            .addField('**Owner information**', `
            > <:bluepoint:889915814684278784> **User:** ${owner.user.username}
            > <:bluepoint:889915814684278784> **ID:** ${owner.user.id}
            > <:bluepoint:889915814684278784> **Boost this server:** ${owner.user.premiumSince ? `Yes` : "No"} 
            `, false)
            .addField('**Other information**', `
            > <:bluepoint:889915814684278784> **Number of roles:** ${server.roles.cache.size}
            > <:bluepoint:889915814684278784> **Number of channels:** ${server.channels.cache.size}
            `, false)
            .setColor(`AQUA`)
            .setThumbnail(server.iconURL())
        await message.channel.send({embeds: [embed]})
    }
}