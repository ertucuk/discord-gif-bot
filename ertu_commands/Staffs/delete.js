const {ActionRowBuilder,ButtonBuilder,ButtonStyle, EmbedBuilder,PermissionsBitField } = require('discord.js');

module.exports = {
name: "delete",
aliases: ["purge"],

execute:async (client, message, args) => {

    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    {
    message.react(`❌`)
    return
    }

    if (args[0] && args[0] < 99 && args[0] > 0 && !isNaN(args[0])) {

        await message.delete();
        await message.channel.bulkDelete(args[0]);
        message.channel.send({ content: `${args[0]} message has been deleted in the <#${message.channel.id}>` }).then((e) => setTimeout(() => { e.delete(); }, 5000));    
    } else {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("ten").setLabel("10").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("twentyfive").setLabel("25").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("fifty").setLabel("50").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("onehundred").setLabel("100").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("cancel").setLabel("X").setStyle(ButtonStyle.Danger)
          );

          let ertu = new EmbedBuilder()
          .setDescription(`
           __**Select How Many Messages You Want To Delete With The Buttons.**__
          `)
          .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
  
        let msg = await message.channel.send({ embeds: [ertu], components: [row] })
        var filter = (button) => button.user.id === message.author.id;
        let collector = await msg.createMessageComponentCollector({ filter, time: 60000 })

        
      collector.on("collect", async (button) => {

        if (button.customId === "ten") {
          await message.delete();
          await message.channel.bulkDelete(10);
          message.channel.send({ embeds: [new EmbedBuilder().setDescription(`10 message has been deleted.`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }
        if (button.customId === "twentyfive") {
          await message.delete();
          await message.channel.bulkDelete(25);
          message.channel.send({ embeds: [new EmbedBuilder().setDescription(`25 message has been deleted.`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }
        if (button.customId === "fifty") {
          await message.delete();
          await message.channel.bulkDelete(50);
          message.channel.send({ embeds: [new EmbedBuilder().setDescription(`50 message has been deleted.`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000));

        }
        if (button.customId === "onehundred") {
          await message.delete();
          await message.channel.bulkDelete(99);
          message.channel.send({ embeds: [new EmbedBuilder().setDescription(`100 message has been deleted.`)]}).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }
        if (button.customId === "cancel") {
          await message.delete();
          msg.edit({ content: `Message Deletion Canceled.`, embeds: [], components: [] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
        }
      })
    }

}

}