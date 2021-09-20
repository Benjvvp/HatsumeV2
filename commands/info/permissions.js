module.exports = {
    name: "permissions",
    async run(message, args, client) {
        const Discord = require('discord.js');

        let adminsitrator = false;
        let kick = false;
        let ban = false;
        let managechannels = false;
        let manageguild = false;
        let manageroles = false;
        let managemessages = false;
        let changenickname = false;
        let viewauditlogs = false;
        let movemembers = false;
        let mentioneveryone = false;

        if (message.member.permissions.has("ADMINISTRATOR")) adminsitrator = true;
        if (message.member.permissions.has("KICK_MEMBERS")) kick = true;
        if (message.member.permissions.has("BAN_MEMBERS")) ban = true;
        if (message.member.permissions.has("MANAGE_CHANNELS")) managechannels = true;
        if (message.member.permissions.has("MANAGE_GUILD")) manageguild = true;
        if (message.member.permissions.has("MANAGE_ROLES")) manageroles = true;
        if (message.member.permissions.has("MANAGE_MESSAGES")) managemessages = true;
        if (message.member.permissions.has("CHANGE_NICKNAME")) changenickname = true;
        if (message.member.permissions.has("VIEW_AUDIT_LOG")) viewauditlogs = true;
        if (message.member.permissions.has("MOVE_MEMBERS")) movemembers = true;
        if (message.member.permissions.has("MENTION_EVERYONE")) mentioneveryone = true;


        const embed = new Discord.MessageEmbed()
        .setTitle('Permission Check')
        .setThumbnail(message.client.displayAvatarURL)
        .setDescription(`**${message.author}**\n\n`)
        .addField('`Administrator`', `${adminsitrator ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Kick Members`', `${kick ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Ban Members`', `${ban ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Manage Channels`', `${managechannels ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Manage Guild`', `${manageguild ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Manage Roles`', `${manageroles ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Manage Messages`', `${managemessages ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Change NickName`', `${changenickname ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`View Audit Logs`', `${viewauditlogs ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Move Members`', `${movemembers ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .addField('`Mention Everyone`', `${mentioneveryone ? "<:checkemojih:836343706855407667>" : "<:xmarkc:836340693289926656>"}`, true)
        .setFooter('Permissions for ' + message.member.displayName)
        .setColor('BLUE')
        message.channel.send({embeds: [embed]})
    }
}