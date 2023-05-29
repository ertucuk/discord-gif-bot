const client = global.client; 
const system = require("./../config.js")
const { Events } = require("discord.js");

client.on(Events.GuildMemberAdd,(member) => {
member.roles.add(system.MemberRole)
})