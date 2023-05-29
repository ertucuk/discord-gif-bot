const client = global.client; 
const system = require("./../config.js")
const { Events, ActivityType } = require("discord.js");

client.on(Events.ClientReady, () => {
    setInterval(async () => {
        const voice = require("@discordjs/voice")
        const channel = client.channels.cache.get(system.BotVoiceChannel);
        voice.joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfMute: true,
            selfDeaf: true
        });
    }, 1000 * 3)

    let activities = system.BotStatus, i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`,
      type: ActivityType.Streaming,
      url: "https://www.twitch.tv/luhux"}), 10000);
})
