module.exports = {
    name: "shutdown",
    async run(message, args, client) {

        const Discord = require('discord.js');
        if (message.author.bot) return;

        const ownerID = "786271962065272864";
        if (message.author.id !== ownerID) {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`❌ ¡ There's a mistake !`)
                .setDescription('**Only the creator of the bot can execute this command.**')
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return await message.channel.send(embed)
        }
        try{
            message.channel.send("`> Succesfully Reloaded`").then(() => {
                process.exit(0);
            });
        }catch(err){
            message.channel.send(`**${err}**`)
        }
    }
}