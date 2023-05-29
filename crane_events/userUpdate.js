const client = global.client; 
const system = require("./../config.js")
const { Events, EmbedBuilder } = require("discord.js");

const { Luppux, JsonDatabase } = require("luppux.js");
Luppux({client:client,database:{type:JsonDatabase,databasePath:"./../luppuxdb.json"}});

client.on(Events.UserUpdate, async (oldUser,newUser) => {

    const avatarExtension = newUser.displayAvatarURL().endsWith(".gif") ? "gif" : newUser.displayAvatarURL().endsWith(".png") ? "png" : newUser.displayAvatarURL().endsWith(".jpeg") ? "jpeg" : newUser.displayAvatarURL().endsWith(".webp") ? "webp" : "jpg"; 
    
    if(avatarExtension === "gif") {
        const newGif = newUser.displayAvatarURL({ extension: "gif" })
        const gifchannel = client.channels.cache.get(system.RandomGifChannel);
        gifchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newGif)
        .setTitle(`Open the browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newGif}`)
        ]});
    } else if(avatarExtension === "jpeg") {
        const newAvatar = newUser.displayAvatarURL({ extension: "jpeg" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open the browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } else if(avatarExtension === "jpg") {
        const newAvatar = newUser.displayAvatarURL({ extension: "jpg" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open the browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } else if(avatarExtension === "png") {
        const newAvatar = newUser.displayAvatarURL({ extension: "png" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open the browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } else if(avatarExtension === "webp") {
        const newAvatar = newUser.displayAvatarURL({ extension: "webp" });
        const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
        ppchannel.send({ embeds: [ new EmbedBuilder()
        .setURL(newAvatar)
        .setTitle(`Open the browser!`)
        .setFooter({text: newUser.id})
        .setImage(`${newAvatar}`)
        ]})
    } 


    const newBanner = await newUser.bannerURL({size:2048,dynamic:true});
    const bannerchannel = client.channels.cache.get(system.RandomBannerChannel);
    bannerchannel.send({ embeds: [ new EmbedBuilder()
    .setURL(newBanner)
    .setTitle(`Open the browser!`)
    .setFooter({text: newUser.id})
    .setImage(`${newBanner}`)
]})
    /*
    const newAvatar = newUser.displayAvatarURL()
    const ppchannel = client.channels.cache.get(system.RandomPhotoChannel);
    ppchannel.send({ embeds: [ new EmbedBuilder()
    .setURL(newAvatar)
    .setTitle(`Open the browser!`)
    .setFooter({text: newUser.id})
    .setImage(`${newAvatar}`)

]})

   const newGif = newUser.displayAvatarURL()
   const gifchannel = client.channels.cache.get(system.RandomGifChannel);
   gifchannel.send({ embeds: [ new EmbedBuilder()
   .setURL(newGif)
   .setTitle(`Open the browser!`)
   .setFooter({text: newUser.id})
   .setImage(`${newGif}`)

]})*/


});