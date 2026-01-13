import {
  CDN,  
  Client,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  Partials,
  REST,
  Routes
} from 'discord.js';
import fs from 'fs';
import 'dotenv/config';
console.log('@ Imported main.js.')

// load .env
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';
const TOKEN = process.env.CLIENT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

// load vars
const AUTOREACT_CHANNELS = [
  '1457644913297461451', // media
  '1455240467322110045', // hear me out
  '1451755887994732635', // music corner
  '1450587588921397391', // art corner
  '1450581708918493287', // memes corner
  '1452937009017520128'  // pet corner
]

// declare client
const client = new Client( {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Channel, Partials.Message]
});
client.on(Events.ClientReady, readyClient => {
  console.log(`===★★★ Logged in as ${readyClient.user.tag}! ★★★===`);
});

// declare commands
const commands = new Map();
const files = fs.readdirSync('./slash-commands/').filter(file => file.endsWith('.js'));

// import & push commands
for (const file of files) {
  const { default: command } = await import(`./slash-commands/${file}`);
  if (!Array.isArray(command)) {
  commands.set(command.data.name, command);
  } else {
    for (const sub of command) {
      commands.set(sub.data.name, sub)
    }
  }
}

// declare rest
const rest = new REST( {
  version: '10'
}).setToken(TOKEN);
try {
  console.log('# Started refreshing application (/) commands…');
  if (DEBUG_MODE) console.log('>>> Commands:', commands);

  // refresh app (/) commands
  await rest.put(Routes.applicationCommands(CLIENT_ID, DEBUG_MODE ? GUILD_ID: undefined), {
    body: Array.from(commands.values()).map(command => command.data.toJSON())
  });

  console.log('@ Successfully reloaded application (/) commands.');
} catch (error) {
  console.error('>@>@>@>@>@ Error occured while refreshing application (/) commands.', error);
}

// try to avoid intent bug if it's not possible to get message
try {
  // when message is sent
  client.on(Events.MessageCreate, async message => {
    if (DEBUG_MODE) console.log(':', message.author.username, 'sent', message.content);
    
    if (message.content.includes('<@1453460836034154709>') || message.content.toLowerCase().includes('miyu')) {
      const { randomItem, salutations, expressions } = await import('./dialogues.js');
      await message.channel.send(`${randomItem(salutations)} ${randomItem(expressions)}`).catch(error => console.error(error));
    }
    // only message on guild
    if (!message.inGuild()) return;
    if (message.guildId === GUILD_ID) {
      if (AUTOREACT_CHANNELS.includes(message.channelId) && (message.attachments.size > 0)) { // || message.embeds.length > 0)) {
        await message.react('⭐').catch(error => console.error(error));
      }
    }
  })
} catch (error) {
  console.error('>@>@>@>@>@ Error trying to create message sent trigger:', error)
}

client.on(Events.GuildMemberAdd, async member => {
  if (member.guild.id === GUILD_ID) {
    const general = await client.channels.fetch('1449761828379824262'),
    guild = await client.guilds.fetch(GUILD_ID);
    if (DEBUG_MODE) console.log('>>> Member joined:', member, '>>> General Channel:', general);
    
    const embed = new EmbedBuilder()
      .setTitle(`𝕨𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 ${guild.name}`)
      .setDescription(`឵           <a:starry:1460596925727379477> introduce yourself at <#1451123742796419205>
 
឵           <a:starry:1460596925727379477> go to <#1450054000287154207> for roles

឵          <a:starry:1460596925727379477> then, start chatting here :D`)
      .setAuthor({
        name: member.user.username,
        iconURL: member.user.displayAvatarURL({
          size: 1024,
          dynamic: true
        })
      })
      .setFooter({
        text: '឵',
        iconURL: 'https://cdn.discordapp.com/attachments/1455425861020024936/1460587815288180839/2de7e3a683724d68.gif?ex=696775e7&is=69662467&hm=314e85b637128c2d9ade61efa32c0dcd3158d871f175f5252ba40b068d5b0d83&'
      })
      .setThumbnail('https://cdn.discordapp.com/attachments/1455425861020024936/1458556908754567332/IMG_20260108_042408.jpg?ex=69601279&is=695ec0f9&hm=ada3b8a7ae9e9d90c8187e091ee1d1b8bb7e058b4856ac8a323547648f52926f&')
      .setColor('#ffffff');
    
    await general.send({
      content: `# Welcome <@${member.id}>!!\n<@&1456969380687777912> say welcome to <@${member.id}> <:please:1450126447669673994>`,
      embeds: [embed]
    });
  }
})

// when app (/) command sent
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (DEBUG_MODE) console.log('[/]', interaction.user.tag, '→', interaction.commandName);
  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, DEBUG_MODE);
  } catch (error) {
    console.error(`>@>@>@>@>@ Error trying to execute /${interaction.commandName}:`, error);
    const content = `i fainted while trying to do /${interaction.commandName}… <:sad:1454182035244454153>`;
    if (interaction.replied || interaction.deferred) {
      await interaction.editReply({
        content
      }).catch(() => {});
    } else {
      await interaction.reply({
        content, flags: 64
      }).catch(() => {});
    }
  }
});

/* LOG IN */
console.log('= Logging in…')
client.login(TOKEN);