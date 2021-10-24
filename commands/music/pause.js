const Discord = require("discord.js");
module.exports = {
  name: "pause",
  async run(message, args, client, lang) {
    const guildQueue = client.distube.getQueue(message);
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          client.languages.__({ phrase: "embederror.title", locale: lang })
        )
        .setDescription(
          client.languages.__({
            phrase: "musicgeneral.entervoice",
            locale: lang,
          })
        )
        .setThumbnail(
          "https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif"
        )
        .setColor("RED");
      return message.channel.send({ embeds: [embed] });
    }
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          client.languages.__({ phrase: "embederror.title", locale: lang })
        )
        .setDescription(
          client.languages.__({
            phrase: "musicgeneral.anotherchannel",
            locale: lang,
          })
        )
        .setThumbnail(
          "https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif"
        )
        .setColor("RED");
      return message.channel.send({ embeds: [embed] });
    }
    if (guildQueue.paused) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          client.languages.__({ phrase: "embederror.title", locale: lang })
        )
        .setDescription(
          client.languages.__({ phrase: "pause.notresumed", locale: lang })
        )
        .setThumbnail(
          "https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif"
        )
        .setColor("RED");
      return message.channel.send({ embeds: [embed] });
    }

    await guildQueue.pause();
    const song = guildQueue.songs[0];

    const embed = new Discord.MessageEmbed()
      .setAuthor(
        client.languages.__({ phrase: "pause.authortitle", locale: lang }),
        message.author.avatarURL({
          format: "png",
          dynamic: true,
        })
      )
      .setTitle(
        client.languages.__mf(
          { phrase: "pause.title", locale: lang },
          { namesong: song.name }
        )
      )
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .addField(
        client.languages.__({ phrase: "musicgeneral.duration", locale: lang }),
        `${song.formattedDuration}`,
        true
      )
      .addField(
        client.languages.__({ phrase: "musicgeneral.volume", locale: lang }),
        `${guildQueue.volume}`,
        true
      )
      .setColor("AQUA");
    return message.channel.send({ embeds: [embed] });
  },
};
