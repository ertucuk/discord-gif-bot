const {StringSelectMenuBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');
const {attachmentStat, messageStat, messageChannelStat} = require("../../Schemas/shema");

module.exports = {
name: "top",
aliases: ["leaderboard"],

execute:async (client, message, args) => {

  const row = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Total Leaderboard').setCustomId('Total').setEmoji("1145017960306577417"),
    new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Photo Leaderboard').setCustomId('Photo').setEmoji("1145017912143392858"),
    new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Gif Leaderboard').setCustomId('Gif').setEmoji("1145017881508192286"),
    );

    const data = await attachmentStat
    .find({ guildID: message.guild.id })
    .sort({ total: -1 });        
    let attachment = data.filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 10)
    .map((x, i) => `${x.userID === message.author.id ? `\` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.total} Post\` **(You)**` : ` \` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.total} Post\``}`)
    .join("\n");

const embed = new EmbedBuilder().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 })).setDescription(`🏆 Top 10 people are shown below.\n\n:star: **Top 10 Post Leaderboard:**\n${attachment}`)

let msg = await message.channel.send({embeds: [embed], components: [row]})
var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 90000 });

collector.on("collect", async (button) => {
  if (button.customId === 'Total') {
    await button.deferUpdate()
  const data = await attachmentStat
    .find({ guildID: message.guild.id })
    .sort({ total: -1 });        
    let attachment = data.filter((x) => message.guild.members.cache.has(x.userID))
    .splice(0, 10)
    .map((x, i) => `${x.userID === message.author.id ? `\` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.total} Post\` **(You)**` : ` \` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.total} Post\``}`)
    .join("\n");

  const embed = new EmbedBuilder().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 })).setDescription(`🏆 Top 10 people are shown below.\n\n:star: **Top 10 Post Leaderboard:**\n${attachment}`)
  msg.edit({embeds: [embed], components: [row]})
  }
  if (button.customId === 'Photo') {
    await button.deferUpdate()
    const data = await attachmentStat
      .find({ guildID: message.guild.id })
      .sort({ totalpp: -1 });        
      let attachment = data.filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 10)
      .map((x, i) => `${x.userID === message.author.id ? `\` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.totalpp} Photo\` **(You)**` : ` \` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.totalpp} Photo\``}`)
      .join("\n");
  
    const embed = new EmbedBuilder().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 })).setDescription(`🏆 Top 10 people are shown below.\n\n:star: **Top 10 Photo Leaderboard:**\n${attachment}`)
    msg.edit({embeds: [embed], components: [row]})
  }

  if (button.customId === 'Gif') {
    await button.deferUpdate()
    const data = await attachmentStat
      .find({ guildID: message.guild.id })
      .sort({ totalgif: -1 });        
      let attachment = data.filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 10)
      .map((x, i) => `${x.userID === message.author.id ? `\` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.totalgif} Gif\` **(You)**` : ` \` ${(i == 0 ? `1` : `${i + 1}`)} \` <@${x.userID}>: \`${x.totalgif} Gif\``}`)
      .join("\n");
  
    const embed = new EmbedBuilder().setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 })).setDescription(`🏆 Top 10 people are shown below.\n\n:star: **Top 10 Gif Leaderboard:**\n${attachment}`)
  msg.edit({embeds: [embed], components: [row]})
    }
  })
 }
}