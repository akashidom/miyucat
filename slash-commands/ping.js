import {
  SlashCommandBuilder
} from 'discord.js';

export default {
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with pong! :3 also checks how laggy the server is'),
  async execute(interaction, DEBUG_MODE) {
    const defer = await interaction.deferReply({
      flags: 64,
      withResponse: true
    });
    if (DEBUG_MODE) console.log('>>> Response:', defer);

    const latency = Date.now() - interaction.createdTimestamp;

    await interaction.editReply('Pong! <:happy:1454088304218734822>\n```latency : ' + latency + ' ms```');
    if (DEBUG_MODE) {
      console.log('>>> Ping Latency:', latency, 'ms');
      console.log('>>> API Latency:', interaction.client.ws.ping, 'ms');
    }
  }
};