const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder,PermissionsBitField } = require('discord.js');
const system = require('../../../config.js');

module.exports = {
name: "vip",
aliases: [],

execute:async (client, message, args) => {

    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(`❌`)
    return
    }

   const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
   if (!member) { message.channel.send("Member is not defined.").then((e) => setTimeout(() => { e.delete(); }, 5000));
   message.react(`❌`)
   return }
   if (!member.roles.cache.has(system.VipRole)){
    message.react(`✅`)
   message.channel.send(`Added VIP role to ${member}`).then((e) => setTimeout(() => { e.delete(); }, 5000));
   await member.roles.add(system.VipRole)
   } else {
    message.react(`✅`)
   message.channel.send(`Removed VIP role on ${member}`).then((e) => setTimeout(() => { e.delete(); }, 5000));
   await member.roles.remove(system.VipRole)
   }

}

}