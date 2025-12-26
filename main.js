// IMPORT
import { REST, Routes } from 'discord.js';
import 'dotenv/config';

// load env
const TOKEN = process.env.CLIENT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

await import './command.js'