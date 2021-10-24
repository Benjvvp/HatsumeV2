const { Client, Intents, MessageEmbed } = require("discord.js");
const intents = new Intents(32767);
const client = new Client({ intents });
const { AutoPoster } = require("topgg-autoposter");
const { SpotifyPlugin } = require("@distube/spotify");

const fs = require("fs");
/* Insert .ENV File */
require("dotenv").config();

/* Connect to DB */
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/* Event Handler */
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
const commandHandler = require("./handler/handlerMessages");

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

//Initialize multi languages
const i18n = require("./utils/i18n");
i18n(client);

//Initialize Music Manager
const Distube = require("distube");
client.distube = new Distube.DisTube(client, {
  emitNewSongOnly: true,
  leaveOnEmpty: true,
  emptyCooldown: 60,
  plugins: [new SpotifyPlugin()],
});

client.distube.on("playSong", (queue, song) => {
  const { lang } = queue.clientMember.guild;

  const embed = new MessageEmbed()
    .setAuthor(
      client.languages.__({ phrase: "play.play", locale: lang }),
      song.user.avatarURL({
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
      `${queue.volume}`,
      true
    )
    .setColor("AQUA");
  return queue.textChannel.send({ embeds: [embed] });
});

client.distube.on("addSong", (queue, song) => {
  const { lang } = queue.clientMember.guild;

  const embed = new MessageEmbed()
    .setAuthor(
      client.languages.__({ phrase: "play.addqueue", locale: lang }),
      song.user.avatarURL({
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
      `${queue.volume}`,
      true
    )
    .setColor("AQUA");
  return queue.textChannel.send({ embeds: [embed] });
});
client.distube.on("addList", (queue, playlist) => {
  const { lang } = queue.clientMember.guild;
  const embed = new MessageEmbed()
    .setAuthor(
      client.languages.__({ phrase: "playlist.authortitle", locale: lang }),
      playlist.user.avatarURL({
        format: "png",
        dynamic: true,
      })
    )
    .setTitle(
      client.languages.__mf(
        { phrase: "playlist.title", locale: lang },
        { songs: playlist.songs.length }
      )
    )
    .setColor("AQUA");
  return queue.textChannel.send({ embeds: [embed] });
});

/*const ap = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NDgyNzU4NTQxNzI0ODc3OSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM0NDQ1NzUxfQ.5R1wTOmmQ2qsSXLbrlK2aqsztEK4PF1HOXahf-J_ipY', client);
ap.on('posted', () => {
	console.log('Posted Stats')
})*/

//Initialize Comamnd Manager
commandHandler(client);

//Music Queue
client.queue = new Map();

//Connect with Discord
client.login(process.env.TOKEN);

// Error handler - omit crashed
client.on("debug", () => {});
client.on("warn", () => {});
client.on("error", () => {});
