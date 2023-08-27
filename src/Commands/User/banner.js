const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
name: "banner",
aliases: [],

execute:async (client, message, args) => {
 
  const member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
   let banner = await ertuBanner(member.id, client)
   if (banner) {
   let Link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Open on browser", style:ButtonStyle.Link, url: `${banner}`})]})
   let msg = await message.channel.send({ content: `${banner}`, components: [Link]})
   }}
}

async function ertuBanner(user, client) {
  const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
  if(!response.data.banner) return 
  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
}
