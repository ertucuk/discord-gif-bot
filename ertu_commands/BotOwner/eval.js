const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require('discord.js');
const { BotOwners } = require('../../config.js');

module.exports = {
name: "eval",
aliases: [],

execute:async (client, message, args, ) => {

if(!BotOwners.some(ertu => message.member.user.id == ertu))return;

if (!args[0]) return message.reply({content:`Write a Code!`});
let code = args.join(" ");
if (code.includes(client.token)) return message.reply({content:"Nope :p"});
try {var sonuç = evalcik(await eval(code));
if (sonuç.includes(client.token))
return message.reply({content:"Nope :p"});} catch (err) {}},};function evalcik(ertu) {if (typeof text !== "string")ertu = require("util").inspect(ertu, { depth: 0 });ertu = ertu.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));return ertu;}