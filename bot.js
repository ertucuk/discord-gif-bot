const { Client,Partials,GatewayIntentBits,Events, EmbedBuilder,ActivityType,Collection } = require('discord.js');
const system = require('./config.js');
const { readdir } = require('fs');

const client = global.client = new Client({intents: Object.keys(GatewayIntentBits),partials:Object.keys(Partials)});

const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection(); 
 readdir("./ertu_commands/", (err, files) => {
     if (err) console.error(err)
     files.forEach(f => {
         readdir("./ertu_commands/" + f, (err2, files2) => {
             if (err2) console.log(err2)
             files2.forEach(file => {
                 let ertucum = require(`./ertu_commands/${f}/` + file);
                 console.log(`${ertucum.name} Loading!`);
                 commands.set(ertucum.name, ertucum);
                 ertucum.aliases.forEach(alias => { aliases.set(alias, ertucum.name); });
             });
         }); 
     });
 });

readdir("./crane_events/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        require(`./crane_events/${f}`);
        console.log(`[EVENT] (${f.replace(".js", "")})`) 
    });
});

 client.on(Events.MessageCreate, async (message) => {
    if (system.Prefix && !message.content.startsWith(system.Prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const commands = args.shift().toLowerCase();
    const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
    if (cmd) {
        cmd.execute(client, message, args);
    }
})

client.on(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(system.BotToken);