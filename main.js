// IMPORT
import { Client, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
console.log('@ Imported main.js')

// load env
const DEBUG_MODE = process.env.DEBUG_MODE;
const TOKEN = process.env.CLIENT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
    if (DEBUG_MODE) console.log("[SLASH]", interaction.user.tag, '→', interaction.commandName);

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

console.log("# Importing command.js")
await import('./command.js');

client.login(TOKEN);

