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
function newSubcommand(name, description) {
  return subcommand => subcommand
  .setName(name)
  .setDescription(description)
  .addStringOption(option => option
    .setName("rating")
    .setDescription("o.0 pick the image kind (warning: nsfw)")
    .addChoices({
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
      })
  )
}
export default [{
  data: new SlashCommandBuilder()
  .setName('booru')
  .setDescription('Shows random image from danbooru :E')

  .addSubcommand(newSubcommand('jojo', 'Summons jojo character in the chat (to be cotinued…)'))

  .addSubcommand(newSubcommand('alnst', 'Summons alien stage character in the chat aaaAaa'))

  .addSubcommand(newSubcommand('uma', 'Summons umamusume character in the chat (^-w-^)√'))

  .addSubcommand(newSubcommand('persona', 'Summons persona character in the chat PERSONA!'))

  .addSubcommand(newSubcommand('ddlc', 'Summons doki doki character in the chat <3'))

  .addSubcommand(newSubcommand('miku', 'Summons miku in the chat /owo\\'))

  .addSubcommand(newSubcommand('teto', 'Summons teto in the chat ∆.-.∆'))

  .addSubcommand(newSubcommand('gumi', 'Summons gumi in the chat (oDo)/'))

  .addSubcommand(newSubcommand('haku', 'Summons haku in the chat 3')))

  .addSubcommand(newSubcommand('kafu', 'Summons kafu in the chat O'))

  .addSubcommand(newSubcommand('demon', 'Summons demon in the chat :>:)'))

  .addSubcommand(newSubcommand('angel', 'Summons angel in the chat O:)'))

  .addSubcommand(newSubcommand('comic', 'Sends story in the chat . . .'))

  .addSubcommand(newSubcommand('femboy', 'Summons femboy in the chat >:)'))

  .addSubcommand(newSubcommand('yaoi', 'Sends BL in the chat //'))

  .addSubcommand(newSubcommand('yuri', 'Sends GL in the chat <>'))

  .addSubcommand(newSubcommand('furry', 'Summons furry in the chat :3')),
  async execute(interaction,
    DEBUG_MODE) {
    const sub = interaction.options.getSubcommand();
    const tags = {
      jojo: 'jojo_no_kimyou_na_bouken',
      alnst: 'alien_stage',
      uma: 'umamusume',
      persona: 'persona',
      ddlc: 'doki_doki_literature_club',
      miku: 'hatsune_miku',
      teto: 'kasane_teto',
      gumi: 'gumi',
      haku: 'yowane_haku',
      kafu: 'kafu_(cevio)',
      demon: 'demon',
      angel: 'angel',
      comic: 'comic',
      femboy: 'femboy',
      yaoi: 'gay',
      yuri: 'yuri',
      furry: 'furry'
    }
    return reply(interaction,
      DEBUG_MODE,
      tags[sub]);
  }
}]