  
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
        if(!channel.permissionsFor(message.guild.me).has("USE_EXTERNAL_EMOJIS")){
            return message.channel.send('**I need \`USE_EXTERNAL_EMOJIS\` permissions to execute most commands, before using me please give me these permissions.**')
        }
        if(!channel.permissionsFor(message.guild.me).has("EMBED_LINKS")){
            return message.channel.send('**I need \`EMBED_LINKS\` permissions to execute most commands, before using me please give me these permissions.**')
        }
        try {
            client.commands.get(cmd).run(message, args, client)
        } catch (error) {
            console.error(error)
            message.reply(client.languages.__({phrase: 'handlerMessages.errorcommand', locale: guild.lang}))
        }
    })
}