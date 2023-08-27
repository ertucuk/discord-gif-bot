const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require('discord.js');
const { BotOwners } = require('../../../config.js');

module.exports = {
name: "eval",
aliases: [],

execute:async (client, message, args, ) => {

if(!BotOwners.some(ertu => message.member.user.id == ertu))return;

if (!args[0]) return;
        let code = args.join(" ");
    
        try {
          var result = clean(await eval(code));
          if (result.includes(client.token))
            return message.channel.send({ content: "https://tenor.com/view/kocaman-bir-nah-nah-el-hareketi-dance-lick-hands-gif-17894624"});
            message.channel.send({ content: `\`\`\`js\n${result}\n\`\`\``});
        } catch (e) {
            return message.channel.send({ content: `\`\`\`js\n${e}\n\`\`\`` });
}

}}

function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }