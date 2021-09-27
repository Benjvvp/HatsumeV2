const Discord = require('discord.js');
const { version } = require('discord.js')
const moment = require('moment')
const m = require('moment-duration-format')
const os = require('os')
const cpuStat = require('cpu-stat')
const ms = require('ms')

module.exports = {
    name: "stats",
    run(message, args, client, lang) {
        let cpuLol;
        cpuStat.usagePercent(function(err, percent, seconds){
            if(err){
                return console.log(err)
            }
            const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const embed = new Discord.MessageEmbed()
            .setTitle(client.languages.__({phrase: 'stats.title', locale: lang}))
            .setColor('PURPLE')
            .addField(client.languages.__({phrase: 'stats.memus', locale: lang}), `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField(client.languages.__({phrase: 'stats.uptime', locale: lang}), `${duration}`, true)
            .addField(client.languages.__({phrase: 'stats.users', locale: lang}), `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
            .addField(client.languages.__({phrase: 'stats.servers', locale: lang}), `${client.guilds.cache.size}`, true)
            .addField(client.languages.__({phrase: 'stats.channels', locale: lang}), `${client.channels.cache.size}`, true)
            .addField('`📝` Discord.js', `v${version}`, true)
            .addField('`📝` Node', `${process.version}`, true)
            .addField('`🤖` CPU', `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField(client.languages.__({phrase: 'stats.cpuusage', locale: lang}), `\`${percent.toFixed(2)}%\``)
            .addField('`🤖` Arch', `\`${os.arch()}\``, true)
            .addField(client.languages.__({phrase: 'stats.platform', locale: lang}), `\`${os.platform()}\` `, true)
            .setFooter(client.languages.__mf({phrase: 'stats.request', locale: lang}, {user: message.author.tag}))
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        })


    }
}