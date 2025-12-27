import {
  SlashCommandBuilder
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
  .setName('miku')
  .setDescription('Shows random miku in the chat /owo\\')
  .addBooleanOption(option => option
  .setName("sensitive")
  .setDescription("with slightly more skin ;)")
  ),
  async execute(interaction, DEBUG_MODE) {}
}