const client = global.client; 
const system = require("../../config.js")
const { Events, ActivityType } = require("discord.js");

client.on(Events.ClientReady, () => {

    let activities = system.BotStatus, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/ertucuk"}), 10000);
})
