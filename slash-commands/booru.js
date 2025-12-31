import {
  SlashCommandBuilder
} from 'discord.js';
import {
  search
} from 'booru';

async function reply(interaction, DEBUG_MODE, tags = []) {
  tags = Array.isArray(tags) ? tags: [tags];
  let flags = 0, booru = 'safebooru';
  const sensitive = interaction.options.getBoolean('sensitive');
  if (sensitive) {
    flags = 64;
    booru = 'danbooru';
  }
  await interaction.deferReply({
    flags: flags
  });

  let post,
  tries = 0;
  do {
    const posts = await search(booru, [...tags, booru === 'danbooru' ? '-rating:explicit,general' : 'rating:general,sensitive,questionable'], {
      limit: 1,
      random: true
    })
    post = posts[0];

    tries++;
    if (DEBUG_MODE) console.log('>>> Post:', post)
    if (tries > 20) throw new Error('>@>@>@>@>@ Error infinite loop while trying to execute:', interaction);
  } while (!post?.fileUrl || /\.(mp4|zip|webm)$/i.test(post.fileUrl ?? ''))

    await interaction.editReply({
    content: post.fileUrl
  })
}

let tagMap = new Map();
function newSubcommand(name, description, tag) {
  tagMap.set(name, tag);
  return subcommand => subcommand
  .setName(name)
  .setDescription(description)
  .addBooleanOption(option => option
    .setName("sensitive")
    .setDescription("o.0 pick the image kind (warning: sensitive contains nsfw)")
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
  
  .addSubcommand(newSubcommand('neko', 'Summons cat girl in the chat <:3', 'cat_girl'))
  
  .addSubcommand(newSubcommand('catboy', 'Summons cat boy in the chat >:3', 'cat_boy'))
  
  .addSubcommand(newSubcommand('femboy', 'Summons femboy in the chat >:)', 'femboy'))

  .addSubcommand(newSubcommand('yaoi', 'Sends BL in the chat //', 'gay'))

  .addSubcommand(newSubcommand('yuri', 'Sends GL in the chat <>', 'yuri'))

  .addSubcommand(newSubcommand('furry', 'Summons furry in the chat :3', 'furry')),
  async execute(interaction,
    DEBUG_MODE) {
    const subcommand = interaction.options.getSubcommand();
    return reply(interaction,
      DEBUG_MODE,
      tagMap.get(subcommand));
  }
}];