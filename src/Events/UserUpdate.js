const client = global.client; 
const system = require("../../config.js")
const { Events, EmbedBuilder } = require("discord.js");
const axios = require('axios');

client.on(Events.UserUpdate, async (oldUser,newUser) => {

    const avatarExtension = newUser.displayAvatarURL().endsWith(".gif") ? "gif" : newUser.displayAvatarURL().endsWith(".png") ? "png" : newUser.displayAvatarURL().endsWith(".jpeg") ? "jpeg" : newUser.displayAvatarURL().endsWith(".webp") ? "webp" : "jpg"; 
    
    if(avatarExtension === "gif") {
        const newGif = newUser.displayAvatarURL({ extension: "gif" })
        const gifchannel = client.channels.cache.get(system.RandomGifChannel);
        gifchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newGif)
        .setTitle(`Open on browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newGif}`)
        ]});
    } else if(avatarExtension === "jpeg") {
        const newAvatar = newUser.displayAvatarURL({ extension: "jpeg" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open on browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } else if(avatarExtension === "jpg") {
        const newAvatar = newUser.displayAvatarURL({ extension: "jpg" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open on browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } else if(avatarExtension === "png") {
        const newAvatar = newUser.displayAvatarURL({ extension: "png" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open on browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } else if(avatarExtension === "webp") {
        const newAvatar = newUser.displayAvatarURL({ extension: "webp" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open on browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } 

    let banner = await ertuBanner(newUser.id, client)
    const bannerchannel = client.channels.cache.get(system.RandomBannerChannel);
     if (banner) { bannerchannel.send({ embeds: [ new EmbedBuilder()
    .setURL(banner ? banner : "")
    .setTitle(`Open on browser!`)
    .setFooter({text: newUser.id})
    .setImage(`${banner ? banner : ""}`)
   ]})}

});


async function ertuBanner(user, client) {
    const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
    if (!response.data.banner) return 
    if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
    else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
  }