import {
  Client,
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
      await message.channel.send(`${randomItem(salutations)} ${randomItem(expressions)}`).catch(error => console.error(eror));
      return;
    }
  })
} catch (error) {
  console.error('>@>@>@>@>@ Error trying to create message sent trigger:', error)
}

client.on(Events.GuildMemberAdd, async member => {
  if (member.guild.id === '1449761826777862196') {
    const general = await client.channels.fetch('1449761828379824262'),
    mention = `<@${member.id}>`;
    if (DEBUG_MODE) console.log('>>> Member joined:', member, '>>> General Channel:', general, '\n>>> Mention:', mention);
  
    await general.send(`<@&1456969380687777912> say welcome to ${mention} <:please:1450126447669673994>`)
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