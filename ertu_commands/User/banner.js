const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');
const { DiscordBanners } = require('discord-banners');

module.exports = {
name: "banner",
aliases: [],

execute:async (client, message, args) => {

const member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
const discordBanners = new DiscordBanners(client);
const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
if(banner){   
let Link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Open the browser", style:ButtonStyle.Link, url: banner})]})
await message.reply({ embeds: [ new EmbedBuilder().setColor("Random").setImage(`${banner}`)] , components:[Link] })}
 
}

}