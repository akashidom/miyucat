// IMPORT
import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
console.log('@ Imported main.js.')

// load .env
const DEBUG_MODE = process.env.DEBUG_MODE === "true";
const TOKEN = process.env.CLIENT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// declare client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.on(Events.ClientReady, readyClient => {
  console.log(`===★★★ Logged in as ${readyClient.user.tag}! ★★★===}`);
});

// declare commands
const commands = [];
const files = await readdir('./slash-commands/').filter(file => file.endsWith('.js'));

// push commands
for (const file of files) {
  const command = await import(`./slash-commands/${file}`);
  commands.push(command.default.data.toJSON());
}

// declare rest
const rest = new REST({ version: '10' }).setToken(TOKEN);
try {
  console.log('# Started refreshing application (/) commands…');
  if (DEBUG_MODE) console.log('>>> Commands:', commands);
  
  // refresh app (/) commands
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
  console.log('@ Successfully reloaded application (/) commands.');
} catch (error) {
  console.error('>@>@>@>@>@ Error occured while refreshing application (/) commands.', error);
}
// when app (/) command sent 
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
    if (DEBUG_MODE) console.log("[/]", interaction.user.tag, '→', interaction.commandName);

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// import commands
console.log("# Importing command.js.")
await import('./command.js');

/* LOG IN */
console.log("= Logging in…")
client.login(TOKEN);

