

import {
  SlashCommandBuilder
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
  .setName('font')
  .setDescription('Replace font whatever text you sent ;) to the one you chose'),
  async execute(interaction, DEBUG_MODE) {}
};
