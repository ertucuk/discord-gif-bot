const client = global.client; 
const system = require("../../config.js")
const { Events, ActivityType } = require("discord.js");
const { attachmentStat } = require("../Schemas/shema.js");
const { CronJob } = require("cron");
const ertum = require("../../config.js");

client.on(Events.ClientReady, () => {

  const daily = new CronJob("0 0 * * *", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => {
      await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { dailypp: 0 } }, { upsert: true });
      await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { dailygif: 0 } }, { upsert: true });
      await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { totaldaily: 0 } }, { upsert: true });
          });
 });
  }, null, true, "Europe/Istanbul");
  daily.start();

  const weekly = new CronJob("0 0 * * 0", () => {
    client.guilds.cache.forEach(async (guild) => {
      guild.members.cache.forEach(async (member) => { 
      await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { weeklypp: 0 } }, { upsert: true });
      await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { weeklygif: 0 } }, { upsert: true });
      await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { totalweekly: 0 } }, { upsert: true });
        });
 });
}, null, true, "Europe/Istanbul");
weekly.start();

const monthly = new CronJob("0 0 1 * *", () => {
  client.guilds.cache.forEach(async (guild) => {
    guild.members.cache.forEach(async (member) => {
    await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { monthlypp: 0 } }, { upsert: true });
    await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { monthlygif: 0 } }, { upsert: true });
    await attachmentStat.findOneAndUpdate({ guildID: ertum.ServerID, userID: member.user.id }, { $set: { totalmonthly: 0 } }, { upsert: true });
      });
});
}, null, true, "Europe/Istanbul");
monthly.start();

})
