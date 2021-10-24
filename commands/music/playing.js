const Discord = require("discord.js");
module.exports = {
  name: "playing",
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
    if (!guildQueue.playing) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          client.languages.__({ phrase: "embederror.title", locale: lang })
        )
        .setDescription(
          client.languages.__({
            phrase: "musicgeneral.notreproducing",
            locale: lang,
          })
        )
        .setThumbnail(
          "https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif"
        )
        .setColor("RED");
      return message.channel.send({ embeds: [embed] });
    }
    const song = guildQueue.songs[0];
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        client.languages.__({ phrase: "play.play", locale: lang }),
        message.author.avatarURL({
          format: "png",
          dynamic: true,
        })
      )
      .setTitle(`${song.name}`)
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
