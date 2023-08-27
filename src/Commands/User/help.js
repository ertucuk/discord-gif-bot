const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
name: "help",
aliases: ["h"],

execute: async (client, message, args) => {

const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder().setCustomId("ertu").setStyle(ButtonStyle.Secondary).setLabel("Ertu ❤️").setDisabled(true)
)

const embed = new EmbedBuilder()
.setThumbnail(message.guild.iconURL({dynamic: true , size: 2048}))
.setTitle("Bot Help Menu")
.setDescription(`
There are 10 commands in total in the bot.

**__Bot Owner Commands:__**
:white_small_square: .eval <code>

**__Staffs Commands:__**
:white_small_square: .count
:white_small_square: .delete <0/100>
:white_small_square: .emoji <emoji>
:white_small_square: .vip <@User/ID>

**__User Commands:__**
:white_small_square: .avatar <@User/ID>
:white_small_square: .banner <@User/ID>
:white_small_square: .help
:white_small_square: .info <@User/ID>
:white_small_square: .top
`)

message.channel.send({embeds: [embed], components: [row]})

}

}