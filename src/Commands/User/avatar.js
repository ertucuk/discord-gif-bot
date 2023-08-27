const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
name: "avatar",
aliases: ["av","avata"],

execute:async (client, message, args) => {

let member = args.length > 0 ? message.mentions.users.first() || await client.users.fetch(args[0]) || message.author : message.author
let Link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Open on browser", style:ButtonStyle.Link, url: member.displayAvatarURL({dynamic:true})})]})
let msg = await message.channel.send({
embeds: [ new EmbedBuilder().setFooter({text: `Requested by ${message.author.username}` }).setTitle(`Avatar of ${member.username}`).setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))], components: [Link]}) 
}

}