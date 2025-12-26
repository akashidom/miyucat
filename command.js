// IMPORT
import { REST, Routes } from 'discord.js';
import { readdir } from 'node:fs/promises'
import 'dotenv/config';
console.log('@ Imported command.js')

// load env
const TOKEN = process.env.CLIENT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [];
const files = await readdir('./');
for (const file of files) {
  console.log(file)
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('# Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('@ Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}