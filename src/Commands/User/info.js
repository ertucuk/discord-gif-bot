const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');
const { LethhFileLoader, YamlDatabase } = require('lethh.xyz');
const db = (global.ErtuDB= new YamlDatabase({ Path: "./ertu.yaml"}));

const {attachmentStat, messageStat, messageChannelStat} = require("../../Schemas/shema");

module.exports = {
name: "info",
aliases: ["information"],

execute:async (client, message, args) => {

    if (message.author.bot) return;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    const ertum = await attachmentStat.findOne({guildID: message.guild.id, userID: member.id})
    const messagertum = await messageStat.findOne({guildID: message.guild.id, userID: member.id})
    const channelTop = await messageChannelStat.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    let messageTop;
    channelTop.length > 0 ? messageTop = channelTop.splice(0, 10).map((x, index) => `\` ${(index == 0 ? `1` : `${index + 1}`)}. \` <#${x.channelID}> \`${Number(x.channelData).toLocaleString()}\``).join("\n") : messageTop = ""

    /*const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Total Statistics').setCustomId('Total').setEmoji("1145017960306577417"),
      new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Daily Statistics').setCustomId('Daily').setEmoji("1145017912143392858"),
      new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Weekly Statistics').setCustomId('Weekly').setEmoji("1145017881508192286"),
      new ButtonBuilder().setStyle(ButtonStyle.Secondary).setLabel('Monthly Statistics').setCustomId('Monthly').setEmoji("1145017839703576717"),

    );*/

    let ertu = new EmbedBuilder()
    .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 2048 }))
    .setDescription(`
\`•\` The information of the usernamed ${member} is provided below.

**❯ Detailed Information** 

:closed_book: Total amount of **post** sent: **${ertum ? ertum.total : 0}**
:closed_book: Total amount of **photo** sent: **${ertum ? ertum.totalpp : 0}**
:closed_book: Total amount of **gif** sent: **${ertum ? ertum.totalgif : 0}**

:green_book: Daily amount of **post** sent: **${ertum ? ertum.totaldaily : 0}**
:green_book: Daily amount of **photo** sent: **${ertum ? ertum.dailypp : 0}**
:green_book: Daily amount of **gif** sent: **${ertum ? ertum.dailygif : 0}**

:blue_book: Weekly amount of **post** sent: **${ertum ? ertum.totalweekly : 0}**
:blue_book: Weekly amount of **photo** sent: **${ertum ? ertum.weeklypp : 0}**
:blue_book: Weekly amount of **gif** sent: **${ertum ? ertum.weeklygif : 0}**

:orange_book: Monthly amount of **post** sent: **${ertum ? ertum.totalmonthly : 0}**
:orange_book: Monthly amount of **photo** sent: **${ertum ? ertum.monthlypp : 0}**
:orange_book: Monthly amount of **gif** sent: **${ertum ? ertum.monthlygif : 0}**

**❯ Message Information (Total: ${messagertum ? messagertum.totalmessage : 0})**
${messageTop}
`)
message.channel.send({embeds: [ertu]})
  }
}