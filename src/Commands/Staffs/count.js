const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder,PermissionsBitField } = require('discord.js');

module.exports = {
name: "count",
aliases: [],

execute:async (client, message, args) => {

    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(`❌`)
    return
    }

    let TotalMember = (message.guild.memberCount)
    let OnlineMember = (message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    let VoiceMember = (message.guild.members.cache.filter((x) => x.voice.channel).size)
    let Boost = (message.guild.premiumSubscriptionCount)

    message.react(`✅`)
    const ertu31 = new EmbedBuilder()
    .setDescription(`
    A total of **${VoiceMember}** people are currently on voice channel.
    There are **${TotalMember}** members on the server (**${OnlineMember}** Online)
    There are **${Boost}** boosts in total.`)

    let msg = await message.channel.send({ embeds: [ertu31]})

}

}