const client = global.client; 
const system = require("../../config.js")
const { Events, EmbedBuilder, Collection } = require("discord.js");
const {attachmentStat,messageStat, messageChannelStat } = require("../Schemas/shema.js");
const { ComponentType } = require("discord.js");

const cache = new Collection();

client.on(Events.MessageCreate, async (message) => {
if (message.author.bot) return;

    const categories = system.Categories;
    if (message.attachments.size === 0 && categories.includes(message.channel.parentId)) {
        await message.delete();
        const deleteMessage = await message.channel.send("You can only share banner, pfp, and gif on this channel!");
        setTimeout(() => {
            deleteMessage.delete();
        }, 5000);
    }
    if (message.attachments.size > 0 && categories.includes(message.channel.parentId)) {
    let gifCount = 0;
    let photoCount = 0;
    let incrementData = {};

    
      message.attachments.forEach((attachment) => {
        if (attachment.url.endsWith('.gif')) {
            incrementData.total = (incrementData.total || 0) + 1;
            incrementData.totaldaily = (incrementData.totaldaily || 0) + 1;
            incrementData.totalweekly = (incrementData.totalweekly || 0) + 1;
            incrementData.totalmonthly = (incrementData.totalmonthly || 0) + 1;
            incrementData.totalgif = (incrementData.totalgif || 0) + 1;
            incrementData.dailygif = (incrementData.dailygif || 0) + 1;
            incrementData.weeklygif = (incrementData.weeklygif || 0) + 1;
            incrementData.monthlygif = (incrementData.monthlygif || 0) + 1;
            gifCount++;
        } else {
            incrementData.total = (incrementData.total || 0) + 1;
            incrementData.totaldaily = (incrementData.totaldaily || 0) + 1;
            incrementData.totalweekly = (incrementData.totalweekly || 0) + 1;
            incrementData.totalmonthly = (incrementData.totalmonthly || 0) + 1;
            incrementData.totalpp = (incrementData.totalpp || 0) + 1;
            incrementData.dailypp = (incrementData.dailypp || 0) + 1;
            incrementData.weeklypp = (incrementData.weeklypp || 0) + 1;
            incrementData.monthlypp = (incrementData.monthlypp || 0) + 1;
            photoCount++;
        }
    });

    await attachmentStat.findOneAndUpdate(
        { guildID: message.guild.id, userID: message.author.id },
        { $inc: incrementData },
        { upsert: true }
    );

    // const LatestData = cache.get(message.author.id);
    const datacheck2 = await attachmentStat.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
    });
    const gifLogChannel = client.channels.cache.get(system.GifLogChannel);
    if (gifLogChannel) {
        gifLogChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(
                        `${message.author} **(${message.author.tag} - ${
                            message.author.id
                        })** sent ${
                            gifCount > 0 ? `${gifCount} gif ${photoCount > 0 ? 'and' : ''}` : ''
                        } ${photoCount > 0 ? `${photoCount} photo` : ''} to <#${
                            message.channel.id
                        }>\n\n:link: This person amount of **post** sent: **${
                            datacheck2.total || 0
                        }**
                        :link: This person amount of **gif** sent:** ${
                            datacheck2.totalgif || 0
                        }**\n:link: This person amount of **photo** sent: **${
                            datacheck2.totalpp || 0
                        }**`
                    ),
            ],
        });
    }
}
});

