const { parseEmoji, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require('discord.js');
const { BotOwners } = require('../../../config.js');

module.exports = {
name: "emoji",
aliases: ["upload-emoji"],

execute:async (client, message, args, ) => {

if(!message.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) return message.reply({ embeds: [ new EmbedBuilder().setDescription(`you cant use this command`)]});


let emoji = args[0];
let emojiName = args[1];
if (!emoji) return message.reply({content: "Specify an emoji."})
const parseCustomEmoji = parseEmoji(emoji);
if (parseCustomEmoji.id) {
const emojiLink = `https://cdn.discordapp.com/emojis/${parseCustomEmoji.id}.${
parseCustomEmoji.animated ? 'gif' : 'png'
  }`;
  const createEmoji = await message.guild.emojis.create({ attachment: emojiLink, name: emojiName || parseCustomEmoji.name});
  message.reply({
  content: `Emoji is added. ${createEmoji}`,
    });
   } else {
    message.reply({content: "no emoji."})
}

}
}