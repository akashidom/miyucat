

import {
  SlashCommandBuilder
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
  .setName('font')
  .setDescription('Replace font whatever text you sent ;) to the one you chose')
  .addStringOption(option => option
  .setName('message')
  .setDescription('Enter message you want to apply the font :D')
  .setRequired(true))
  .addStringOption(option => option
  .setName('font')
  .setDescription('Pick the font you want to apply ;)')
  .addChoices()
  .setRequired(true)),
  async execute(interaction, DEBUG_MODE) {}
};
