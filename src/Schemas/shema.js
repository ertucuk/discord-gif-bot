const mongoose = require("mongoose");

const messageStat = mongoose.model('messagestat', new mongoose.Schema({

guildID: String,
userID: String,
totalmessage: { type: Number, default: 0 },
}))

const attachmentStat = mongoose.model('attachmentStat', new mongoose.Schema({
guildID: String,
userID: String,

total: { type: Number, default: 0 },
totaldaily: { type: Number, default: 0 },
totalweekly: { type: Number, default: 0 },
totalmonthly: { type: Number, default: 0 },

totalgif: { type: Number, default: 0 },
dailygif: { type: Number, default: 0 },
weeklygif: { type: Number, default: 0 },
monthlygif: { type: Number, default: 0 },

totalpp: { type: Number, default: 0 },
dailypp: { type: Number, default: 0 }, 
weeklypp: { type: Number, default: 0 },
monthlypp: { type: Number, default: 0 },
}))

const messageChannelStat = mongoose.model('messageChannelStat', new mongoose.Schema({
guildID: String,
userID: String,
channelID: String,
channelData: { type: Number, default: 0 },
}))

module.exports = {messageStat,attachmentStat,messageChannelStat}