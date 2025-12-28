import {
  SlashCommandBuilder
} from 'discord.js';
import {
  search
} from 'booru';

async function reply(interaction, DEBUG_MODE, tags = []) {
  tags = Array.isArray(tags) ? tags: [tags];
  let flags = 0;
  let rating = interaction.options.getString('rating');
  if (!rating) {
    rating = 'general';
  } else if (rating === 'questionable,explicit') {
    // note : no need to check if it's dm since if it's not in channel it'll flags 64 anyway
    if (!interaction.channel?.nsfw || !interaction.channel) {
      flags = 64;
    }
  }
  await interaction.deferReply({
    flags: flags
  });

  let post, tries = 0;
  do {
    const posts = await search('danbooru', [...tags, 'rating:' + rating], {
      limit: 1,
      random: true
    })
    post = posts[0];

    tries++;
    if (DEBUG_MODE) console.log('>>> Post:', post)
    if (tries > 6) throw new Error('>@>@>@>@>@ Error infinite loop while trying to execute:', interaction);
  } while (!post?.fileUrl || /\.(mp4|zip|webm)$/i.test(post.fileUrl ?? ''))

    await interaction.editReply({
    content: post.fileUrl
  })
}
const ratings = [{
  name: 'General',
  value: 'general'
},
  {
    name: 'Possibly sensitive',
    value: 'sensitive'
  },
  {
    name: 'NSFW',
    value: 'questionable,explicit'
  }];

export default [{
  data: new SlashCommandBuilder()
  .setName('booru miku')
  .setDescription('Shows random miku in the chat /owo\\')
  .addStringOption(option => option
    .setName("rating")
    .setDescription("o.0 pick the image kind (warning: nsfw)")
    .addChoices(ratings)
  ),
  async execute(interaction, DEBUG_MODE) {
    return reply(interaction, DEBUG_MODE, 'hatsune_miku');
  }
}]

