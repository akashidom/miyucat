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

