import {
  SlashCommandBuilder
} from 'discord.js';
import {
  search
} from 'booru';

export default {
  data: new SlashCommandBuilder()
  .setName('miku')
  .setDescription('Shows random miku in the chat /owo\\')
  .addStringOption(option => option
    .setName("rating")
    .setDescription("o.0 pick the image kind (warning: nsfw)")
    .addChoices([{
      name: 'general', value: 'general'
    },
      {
        name: 'sensitive', value: 'sensitive'
      },
      {
        name: 'explicit', value: 'questionable,explicit'
      }])
  ),
  async execute(interaction, DEBUG_MODE) {
    await interaction.deferReply();
    let rating = 'rating:general';
    if (interaction.options.getBoolean('sensitive')) {
      rating = 'rating:sensitive';
    }

    let post;
    do {
      const posts = await search('danbooru', ['hatsune_miku', rating], {
        limit: 1,
        random: true
      })
      post = posts[0];

      if (DEBUG_MODE) console.log('>>> Post:', post)
    } while (!post.fileUrl || post.fileUrl.endsWith('.mp4'))

      await interaction.editReply({
      content: post.fileUrl
    })
  }
}