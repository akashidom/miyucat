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
  .setName('booru')
  .setDescription('Shows random image from danbooru :E')

  .addSubcommand(sub => sub
    .setName('jojo')
    .setDescription('Summons jojo character in the chat (to be cotinued…)')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('alnst')
    .setDescription('Summons alien stage character in the chat aaaAaa')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
    .addSubcommand(sub => sub
    .setName('uma')
    .setDescription('Summons umamusume character in the chat (^-w-^)√')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
    .addSubcommand(sub => sub
    .setName('persona')
    .setDescription('Summons persona character in the chat PERSONA!')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('ddlc')
    .setDescription('Summons doki doki character in the chat <3')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('miku')
    .setDescription('Summons miku in the chat /owo\\')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )

  .addSubcommand(sub => sub
    .setName('teto')
    .setDescription('Summons teto in the chat ∆.-.∆')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )

  .addSubcommand(sub => sub
    .setName('gumi')
    .setDescription('Summons gumi in the chat (oDo)/')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('haku')
    .setDescription('Summons haku in the chat 3')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('kafu')
    .setDescription('Summons kafu in the chat O')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )

    .addSubcommand(sub => sub
    .setName('comic')
    .setDescription('Sends story in the chat . . .')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('femboy')
    .setDescription('Summons femboy in the chat >:)')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
  .addSubcommand(sub => sub
    .setName('yaoi')
    .setDescription('Sends BL in the chat //')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )

  .addSubcommand(sub => sub
    .setName('yuri')
    .setDescription('Sends GL in the chat <>')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  )
  
    .addSubcommand(sub => sub
    .setName('furry')
    .setDescription('Summons furry in the chat :3')
    .addStringOption(option => option
      .setName("rating")
      .setDescription("o.0 pick the image kind (warning: nsfw)")
      .addChoices(...ratings)
    )
  ),
  async execute(interaction, DEBUG_MODE) {
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
      comic: 'comic',
      femboy: 'femboy',
      yaoi: 'gay',
      yuri: 'yuri',
      furry: 'furry'
    }
    return reply(interaction, DEBUG_MODE, tags[sub]);
  }
}]