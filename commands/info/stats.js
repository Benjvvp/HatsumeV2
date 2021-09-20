const Discord = require('discord.js');
const { version } = require('discord.js')
const moment = require('moment')
const m = require('moment-duration-format')
const os = require('os')
const cpuStat = require('cpu-stat')
const ms = require('ms')

module.exports = {
    name: "stats",
    run(message, args, client) {
        let cpuLol;
        cpuStat.usagePercent(function(err, percent, seconds){
            if(err){
                return console.log(err)
            }
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} Statistics`)
            .setColor('PURPLE')
            .addField('`📇` Mem Usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField('`⌚️` Uptime', `${duration}`, true)
            .addField('`📁` Users', `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
            .addField('`📁` Servers', `${client.guilds.cache.size}`, true)
            .addField('`📁` Channels', `${client.channels.cache.size}`, true)
            .addField('`📝` Discord.js', `v${version}`, true)
            .addField('`📝` Node', `${process.version}`, true)
            .addField('`🤖` CPU', `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField('`🤖` CPU Usage', `\`${percent.toFixed(2)}%\``)
            .addField('`🤖` Arch', `\`${os.arch()}\``, true)
            .addField('`👾` Platform', `\`${os.platform()}\` `, true)
            .setFooter(`Request by ${message.author.tag}`)
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        })


    }
}