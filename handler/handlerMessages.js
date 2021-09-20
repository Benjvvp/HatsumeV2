  
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
        const {author,guild} = message;

        // Check if user is a bot
        if (author.bot || !guild) {
            return
        }
        
        if (message.mentions.users.get(message.client.user.id)){ 
            const embed = new MessageEmbed()
                .setTitle(`<:checkinfo:836037745822531664> Oops, you pinged me? Need help?`)
                .setDescription('**Hello!!, my name is Hatsume and you can see my list of commands with `$$Commands` Thank you.**')
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0cVBcTYb7p02Dg-NJIWtPBowdG7w82H1DFg&usqp=CAU")
                .setColor("AQUA")
            message.channel.send({embeds: [embed]})
        }

        const servidores = new db.crearDB(`servidores`);
        let prefix = "$$"
        if (servidores.tiene(message.guild.id) == true){
            prefix = await servidores.obtener(`${message.guild.id}`);
        }
        
        // Ignore messages without prefix
        if (!message.content.startsWith(prefix)) return

        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g)

        const cmd = args.shift().toLowerCase()
        
        if(!client.commands.has(cmd)) return;

        try {
            client.commands.get(cmd).run(message, args, client)
        } catch (error) {
            console.error(error)
            message.reply("There was an error trying to execute this command!")
        }
    })
}