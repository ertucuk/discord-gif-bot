const {StringSelectMenuBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');
const { LethhFileLoader, YamlDatabase } = require('lethh.xyz');
const db = (global.ErtuDB= new YamlDatabase({ Path: "./ertu.yaml"}));

module.exports = {
name: "top",
aliases: ["leaderboard"],

execute:async (client, message, args) => {

const row = new ActionRowBuilder()
.addComponents(
    new StringSelectMenuBuilder()
    .setCustomId('ertucum')
    .setPlaceholder(`See Other Leaderboard`)
    .addOptions([
    { label: 'PP', description: 'PP Leaderboard', value: 'pp'},
    { label: 'Gif', description: 'Gif LeaderBoard', value: 'gif'},
    ]),
    );

    const ertucum = message.guild.members.cache.filter(e=>db.has(`total.${e.user.id}`)&&!e.user.bot).array().sort((a, b) => { return (db.fetch(`total.${b.user.id}`) || 0) - (db.fetch(`total.${a.user.id}`) || 0) });
    const top10 = ertucum.splice(0, args[0] || 10)
    var rank = 1
    const map = top10.map(s=>` \` ${rank++} \` <@!${s.user.id}> | Total: \`${db.fetch(`total.${s.user.id}`)||0}\` (\`${db.fetch(`pp.${s.user.id}`)||0} pp, ${db.fetch(`gif.${s.user.id}`)||0} gif\`)`).join('\n')
    let embed = new EmbedBuilder()
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setDescription(map||`Nobody Shared PP/Gif`)

    let msg = await message.channel.send({embeds:[embed], components: [row] })
    const filter = i => i.user.id === message.member.id;
    const collector = await msg.createMessageComponentCollector({ filter: filter, time: 30000 });

    collector.on("collect", async (interaction) => {

      if (interaction.values[0] === "pp") {
        await interaction.deferUpdate();

        const ertucum = message.guild.members.cache.filter(e=>db.has(`pp.${e.user.id}`)&&!e.user.bot).array().sort((a, b) => { return (db.fetch(`pp.${b.user.id}`) || 0) - (db.fetch(`pp.${a.user.id}`) || 0) });
        const top10 = ertucum.splice(0, args[1] || 10)
        var rank = 1
        const map = top10.map(s=>`\` ${rank++} \` <@${s.user.id}> | \`${db.fetch(`pp.${s.user.id}`)||0}\` pp`).join('\n')
        let embed = new EmbedBuilder()
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setDescription(map||`Nobody Shared PP`)
        msg.edit({embeds: [embed], components: [row]})
      }
      if (interaction.values[0] === "gif") {
        await interaction.deferUpdate();

        const ertucum = message.guild.members.cache.filter(e=>db.has(`gif.${e.user.id}`)&&!e.user.bot).array().sort((a, b) => { return (db.fetch(`gif.${b.user.id}`) || 0) - (db.fetch(`gif.${a.user.id}`) || 0) });
        const top10 = ertucum.splice(0, args[1] || 10)
      var rank = 1
      const map = top10.map(s=>`\` ${rank++} \` <@${s.user.id}> | \`${db.fetch(`gif.${s.user.id}`)||0}\` gif`).join('\n')
      let embed = new EmbedBuilder()
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
    .setDescription(map||`Nobody Shared GIF`)
    msg.edit({embeds: [embed], components: [row]}) 


      }
    })










}

}