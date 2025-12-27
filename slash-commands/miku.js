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
  .addBooleanOption(option => option
    .setName("sensitive")
    .setDescription("with slightly more skin ;)")
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