  
const {
    readdirSync, read, readSync, readdir
} = require("fs")

require('dotenv').config();
const db = require('megadb')

const {
    Collection,
    MessageEmbed
} = require("discord.js")

const ascii = require("ascii-table")

const table = new ascii().setHeading("Comando", "Estado de carga")


module.exports = async (client) => {

    client.commands = new Collection()
    stuff = readdirSync(__dirname + `/../commands`)
    stuff.forEach(c => {
        const commandFiles = readdirSync(__dirname + `/../commands/${c}`).filter((file) =>
            file.endsWith(".js"),
        )
        for (const file of commandFiles) {
            const command = require(__dirname + `/../commands/${c}/${file}`)

            if (command.name) {
                client.commands.set(command.name, command)
                table.addRow(file, "✅")
            } else {
                table.addRow(file, "❌  -> lack 'name'!")
                continue
            }
        }
    })

    console.log(table.toString())

    client.on("messageCreate", async (message) => {
        const {author, channel, guild} = message;
        const servidores = new db.crearDB(`servidores`);
        guild.lang = 'en';
        if(servidores.has(`${message.guild.id}.lang`)){
            guild.lang = await servidores.get(`${message.guild.id}.lang`)
        }
        let prefix = "$$"
        if(servidores.has(`${message.guild.id}.prefix`)){
            prefix = await servidores.obtener(`${message.guild.id}.prefix`);
        }

        // Check if user is a bot
        if (author.bot || !guild) {
            return
        }
        
        if (message.mentions.users.get(message.client.user.id)){ 
            const embed = new MessageEmbed()
                .setTitle(client.languages.__({phrase: 'handlerMessages.pinged_title', locale: guild.lang}))
                .setDescription(client.languages.__({phrase: 'handlerMessages.pinged_description', locale: guild.lang}))
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0cVBcTYb7p02Dg-NJIWtPBowdG7w82H1DFg&usqp=CAU")
                .setColor("AQUA")
            message.channel.send({embeds: [embed]})
        }
        

        // Ignore messages without prefix
        if (!message.content.startsWith(prefix)) return

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g)

        const cmd = args.shift().toLowerCase()
        
        if(!client.commands.has(cmd)) return;
        if(!channel.permissionsFor(message.guild.me).has("EMBED_LINKS" && "USE_EXTERNAL_EMOJIS")){
            const embed = new MessageEmbed()
                .setAuthor(client.languages.__({phrase: 'embederror.title', locale: guild.lang}))
                .setDescription(client.languages.__({phrase: 'handlerMessages.needescentialspermissions', locale: guild.lang}))
                .setThumbnail("https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif")
                .setColor("RED")
            return message.channel.send({embeds: [embed]});
        }
        try {
            client.commands.get(cmd).run(message, args, client)
        } catch (error) {
            console.error(error)
            message.reply(client.languages.__({phrase: 'handlerMessages.errorcommand', locale: guild.lang}))
        }
    })
}