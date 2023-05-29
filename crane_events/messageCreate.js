const client = global.client; 
const system = require("./../config.js")
const { Events, EmbedBuilder } = require("discord.js");

const { LethhFileLoader, YamlDatabase } = require('lethh.xyz');
const db = (global.ErtuDB= new YamlDatabase({ Path: "./ertu.yaml"}));

client.on(Events.MessageCreate, async (message) => {
    if(message.author.bot) return;
    let categories = system.Categories
    if(message.attachments.size === 0 && categories.includes(message.channel.parentId)) {
        await message.delete();
        message.channel.send({ content: `You can only share banner, pp and gif on this channel!` })
        .then(x => {
            setTimeout(() => {
                x.delete();
            }, 1000*5)
        });
    }
if(message.attachments.size > 0 && categories.includes(message.channel.parentId)){
    db.add(`total.${message.author.id}`,message.attachments.size)
    let pp = 0
    let gif = 0
    message.attachments.forEach(atch=>{
     if(atch.url.endsWith('.webp')||atch.url.endsWith('.png')||atch.url.endsWith('.jpeg')||atch.url.endsWith('.jpg')){
       db.add(`pp.${message.author.id}`,1)
       pp = pp + 1
     }
      if(atch.url.endsWith('.gif')){
       db.add(`gif.${message.author.id}`,1)
        gif = gif +1
      }
    })
  db.add(`channeltotal_${message.channel.id}_${message.author.id}`, 1)
    let ertum = ``
    if(gif > 0 && pp === 0){
    ertum = `${gif} gif`
    }
  if(pp > 0 && gif === 0){
    ertum = `${pp} pp`
    }
  if(gif > 0 && pp > 0){
    ertum = `${pp} pp, ${gif} gif`
    }
    client.channels.cache.get(system.GifLogChannel).send({ embeds: [ new EmbedBuilder().setColor("Random").setDescription(`${message.author} sent **${ertum}** to <#${message.channel.id}>\n\n**Detailed Information:**\n> Total Gif: **${db.fetch(`gif.${message.author.id}`)||0}**\n> Total PP: **${db.fetch(`pp.${message.author.id}`)||0}**`)]})
  }
});