module.exports = {
  name: "infoemoji",
  async run(message, args, client, lang) {
    const { Util, MessageEmbed } = require("discord.js");
    if (!args[0]) {
      const embed = new MessageEmbed()
        .setAuthor(
          client.languages.__({ phrase: "embederror.title", locale: lang })
        )
        .setDescription(
          client.languages.__({ phrase: "infoemoji.enteremoji", locale: lang })
        )
        .setThumbnail(
          "https://2.bp.blogspot.com/-CPO_z4zNSnc/WsY667p0JgI/AAAAAAAAYRs/ubTMJD5ToyImbR-o4EiK18gBypYXd0RiwCLcBGAs/s1600/Mercenary%2BGarage%2BError%2BGIF.gif"
        )
        .setColor("RED");
      return await message.channel.send({ embeds: [embed] });
    }

    let emoji =
      client.emojis.cache.get(args[0]) ||
      client.emojis.cache.find((e) => e.name === args[1]);
    if (!emoji) {
      let e;
      if (args[0].includes(":")) {
        e = Util.parseEmoji(args[0]);
      }
      if (!e.id) emoji = client.emojis.cache.find((a) => a.name === e.name);
      else emoji = client.emojis.cache.get(e.id);
      if (
        /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/gim.test(
          e.name
        )
      )
        emoji = e.name;
      if (!emoji)
        return message.channel.send(
          client.languages.__({ phrase: "infoemoji.invalid", locale: lang })
        );
      if (e.animated) {
        const embed = new MessageEmbed()
          .setTitle(
            client.languages.__({
              phrase: "infoemoji.sucesstitle",
              locale: lang,
            })
          )
          .setDescription(
            client.languages.__mf(
              { phrase: "infoemoji.animated", locale: lang },
              { name: e.name, id: e.id }
            )
          )
          .setTimestamp()
          .setColor("#42bf91");
        return message.channel.send({ embeds: [embed] });
      }
      const embed = new MessageEmbed()
        .setTitle(
          client.languages.__({ phrase: "infoemoji.sucesstitle", locale: lang })
        )
        .setDescription(
          client.languages.__mf(
            { phrase: "infoemoji.notanimated", locale: lang },
            { name: e.name, id: e.id }
          )
        )
        .setTimestamp()
        .setColor("#42bf91");
      message.channel.send({ embeds: [embed] });
    }
  },
};
