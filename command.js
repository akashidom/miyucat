// IMPORT
import { REST, Routes } from 'discord.js';
import { readdir } from 'node:fs/promises'
import 'dotenv/config';
console.log('@ Imported command.js.')

// load .env
const DEBUG_MODE = process.env.DEBUG_MODE === "true";
const TOKEN = process.env.CLIENT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

// declare commands
const commands = [];
const files = await readdir('./slash-commands/').filter(file => file.endsWith('.js'));

// push commands
for (const file of files) {
  const command = await import(`./slash-commands/${file}`);
  commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN); // declare rest
try {
  console.log('# Started refreshing application (/) commands…');
  if (DEBUG_MODE) console.log('>>> Commands:', commands);
  
  // refresh app commands
  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  
  console.log('@ Successfully reloaded application (/) commands.');
} catch (error) {
  console.error('>@>@>@>@>@ Error occured while refreshing application (/) commands.', error);
}