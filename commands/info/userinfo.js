module.exports = {
    name: "userinfo",
    async run(message, args, client) {
        const Discord = require('discord.js');
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"

        let status; // Hacemos un let vacio
        switch (user.presence.status) {// Hacemos un switch de la funcion Presencia
            case "online":// En el caso online..
                status = "`🟢` Online";// hacemos que el status online pase a decir lo siguiente...
                break;
            case "dnd":// En el caso dnd..
                status = "`⛔` Don't disturb";// hacemos que el status dnd pase a decir lo siguiente...
                break;
            case "idle":// En el caso idle..
                status = "`🌙` Absent";// hacemos que el status idle pase a decir lo siguiente...
                break;
            case "offline":// En el caso offline..
                status = "`⚪` Disconnected";// hacemos que el status offline pase a decir lo siguiente...
                break;
        }

        const embed = new Discord.MessageEmbed() // Hacemos un nuevo embed
            .setTitle(`User information ${user.user.username}`) // Titulo - Recibimos el "user" y decimos su "username"
            .setColor(`#ff8000`)// Color para hacerlo mas bonito <3
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true })) // Un Thumbnail de la foto de perfil del "user".
            .addFields(// Hacemos nuevas Fields
                {
                    name: "**`📜` Nickname**",// Nombre - Titulo - Caso 1
                    value: user.nickname ? user.nickname : "He doesn't have a nickname.", // Si el "user" tiene apodo se envia, si es false / no tiene Se envia diciendo que "No tiene Apodo"
                    inline: true // En linea: SI
                },
                {
                    name: "**`📑` Tag**",// Nombre - Titulo - Caso 1
                    value: `${user.user.discriminator}`,// Del "user" sacamos su tag / discriminador
                    inline: true// En linea: SI
                },
                {
                    name: "**`📝` ID**",// Nombre - Titulo - Caso 1
                    value: user.user.id,// Del "user" sacamos su ID
                },
                {
                    name: "**`🔎` Recent Activity**",// Nombre - Titulo - Caso 1
                    value: status,// Acá se obtiene el estado del "user" con los casos ya dichos y explicado anteriormente.
                    inline: true// En linea: SI
                },
                {
                    name: "**`💡` State**",// Nombre - Titulo - Caso 1
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "No status",// Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
                    inline: true// En linea: SI
                },
                {
                    name: '**`🔗` Avatar link**',// Nombre - Titulo - Caso 1
                    value: `[Aquí](${user.user.displayAvatarURL()})`// Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
                },
                {
                    name: '**`📅` Date of creation**',// Nombre - Titulo - Caso 1
                    value: user.user.createdAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: '**`📆` Date of entry to the Server**',// Nombre - Titulo - Caso 1
                    value: user.joinedAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de entrada al servidor en donde se envio el mensaje y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true// En linea: SI
                },
                {
                    name: '**`📚` User roles**',// Nombre - Titulo - Caso 1
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),// Del "user" obtenemos sus roles del server y lo mapeamos tambien lo separamos con una coma ","
                    inline: true// En linea: SI
                }
            )

        await message.channel.send({embeds: [embed]})
    }
}