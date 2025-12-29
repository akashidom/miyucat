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
  } 
  /* 
    else if (rating === 'sensitive' || rating === 'questionable,explicit') {
    // note : no need to check if it's dm since if it's not in channel it'll flags 64 anyway
    if (!interaction.channel?.nsfw || !interaction.channel) {
      flags = 64;
    }
  }
  */
  await interaction.deferReply({
    flags: flags
  });

  let post,
  tries = 0;
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

let tags = new Map();
function newSubcommand(name, description, tag) {
  tags.set(name, tag);
  return subcommand => subcommand
  .setName(name)
  .setDescription(description)
  .addStringOption(option => option
    .setName("rating")
    .setDescription("o.0 pick the image kind (warning: nsfw)")
    .addChoices({
      name: 'General',
      value: 'general'
    }
  /*,
      {
        name: 'Possibly sensitive',
        value: 'sensitive'
      },
      {
        name: 'NSFW',
        value: 'questionable,explicit'
      }
  */
  )
  )
}
export default [{
  data: new SlashCommandBuilder()
  .setName('booru')
  .setDescription('Shows random image from danbooru :E')

  .addSubcommand(newSubcommand('jojo', 'Summons jojo character in the chat (to be cotinued…)', 'jojo_no_kimyou_na_bouken'))

  .addSubcommand(newSubcommand('alnst', 'Summons alien stage character in the chat aaaAaa', 'alien_stage'))

  .addSubcommand(newSubcommand('uma', 'Summons umamusume character in the chat (^-w-^)√', 'umamusume'))

  .addSubcommand(newSubcommand('persona', 'Summons persona character in the chat PERSONA!', 'persona'))

  .addSubcommand(newSubcommand('ddlc', 'Summons doki doki character in the chat <3', 'doki_doki_literature_club'))

  .addSubcommand(newSubcommand('miku', 'Summons miku in the chat /owo\\', 'hatsune_miku'))

  .addSubcommand(newSubcommand('teto', 'Summons teto in the chat ∆.-.∆', 'kasane_teto'))

  .addSubcommand(newSubcommand('gumi', 'Summons gumi in the chat (oDo)/', 'gumi'))

  .addSubcommand(newSubcommand('haku', 'Summons haku in the chat 3', 'yowane_haku'))

  .addSubcommand(newSubcommand('kafu', 'Summons kafu in the chat O', 'kafu_(cevio)'))

  .addSubcommand(newSubcommand('demon', 'Summons demon in the chat :>:)', 'demon'))

  .addSubcommand(newSubcommand('angel', 'Summons angel in the chat O:)', 'angel'))
  
  /*
  .addSubcommand(newSubcommand('neko', 'Summons cat girl in the chat <:3', 'cat_girl'))
  
  .addSubcommand(newSubcommand('catboy', 'Summons cat boy in the chat >:3', 'cat_boy'))
  
  .addSubcommand(newSubcommand('femboy', 'Summons femboy in the chat >:)', 'femboy'))

  .addSubcommand(newSubcommand('yaoi', 'Sends BL in the chat //', 'gay'))

  .addSubcommand(newSubcommand('yuri', 'Sends GL in the chat <>', 'yuri'))

  .addSubcommand(newSubcommand('furry', 'Summons furry in the chat :3', 'furry'))
  */
  ,
  async execute(interaction,
    DEBUG_MODE) {
    const subcommand = interaction.options.getSubcommand();
    return reply(interaction,
      DEBUG_MODE,
      tags.get(subcommand));
  }
}];