const client = global.client; 
const { Events, EmbedBuilder } = require("discord.js");
const {messageStat, messageChannelStat} = require("../Schemas/shema")

client.on(Events.MessageCreate, async (message) => {
if (message.author.bot) return;
await messageStat.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { totalmessage: 1 } }, { upsert: true });
await messageChannelStat.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });

})