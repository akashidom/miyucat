import {
  SlashCommandBuilder
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
  .setName('miku')
  .setDescription('Shows random miku in the chat /owo\\'),
  async execute(interaction, DEBUG_MODE) {}
}