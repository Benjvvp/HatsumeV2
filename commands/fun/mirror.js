module.exports = {
  name: "mirror",
  async run(message, args, client, lang) {
    const { MessageAttachment } = require("discord.js");
    const Canvas = require("canvas");

    let mention =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author; 
    let avatar = mention.displayAvatarURL({
      size: 256,
      format: "png",
      dynamic: false,
    });

    const canvas = Canvas.createCanvas(451, 679);
    const ctx = canvas.getContext("2d");

    let bg = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/750461925099307129/753343100826550473/images.jpeg"
    );
    ctx.drawImage(bg, 0, 0);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, 500, 125, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    let imagen = await Canvas.loadImage(avatar);
    ctx.drawImage(imagen, 100.5, 375);

    let att = new MessageAttachment(canvas.toBuffer(), "mirror.png");
    message.channel.send({files: [att]});
  },
};
