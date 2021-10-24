const fetch = require("node-fetch");

//Functions not EXPORTING
function sendBotStats(client) {
  fetch("http://localhost:3001/botStats", {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    body: JSON.stringify({
      guilds: client.guilds.cache.size,
      channels: client.channels.cache.size,
      users: client.users.cache.size,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    },
  });
}

//Function exporting
function sendBotStatsDidMount(client) {
  sendBotStats(client);
  this.timer = setInterval(() => {
    sendBotStats(client);
  }, 1000 * 60 * 5); //Refresh interval
}
function sendBotStatsClearInterval() {
  clearInterval(this.timer);
}

module.exports = { sendBotStatsDidMount, sendBotStatsClearInterval, sendBotStats };