module.exports = {
  name: "rip",
  async run(message, args, client, lang) {
    const Canvas = require("canvas");
    const {MessageAttachment} = require('discord.js')

    let user = message.mentions.users.first() || message.author;

    let avatar = user.displayAvatarURL({
      dynamic: false,
      size: 128,
      format: "png",
    });

    const canvas = Canvas.createCanvas(675, 354);
    const ctx = canvas.getContext("2d");

    let bg = await Canvas.loadImage(
      "https://static.boredpanda.es/blog/wp-content/uploads/2017/10/tumbas-fb__700-png.jpg"
    );
    ctx.drawImage(bg, 0, 0);

    ctx.beginPath();
    ctx.arc(canvas.width / 2, 214, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.clip();

    let imagen = await Canvas.loadImage(avatar);
    ctx.drawImage(imagen, 274, 150);

    let att = new MessageAttachment(canvas.toBuffer(), "rip.png");

    message.channel.send({files: [att]});
  },
};
