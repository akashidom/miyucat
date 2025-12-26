import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong! :3'),
  async execute(interaction, DEBUG_MODE) {
    const defer = await interaction.deferReply({
      flags: 64,
      withResponse: true
    });
    if (DEBUG_MODE) console.log(defer);
    
    const latency = interaction.createdTimestamp - defer.interaction.createdTimestamp;
    
    await interaction.editReply('Pong! <:happy:1454088304218734822>\n```latency : ' + latency + 'ms````');
  }
};