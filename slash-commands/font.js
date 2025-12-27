import {
  SlashCommandBuilder,
  EmbedBuilder
} from 'discord.js';

// font vars
let fonts = [];
let styles = new Map();
function addFont(key, name, style) {
  fonts.push({name:name,value:key});
  styles.set(key, style);
}

/* add fonts */
addFont('lightTextBubbles', 'Ⓛⓘⓖⓗⓣ Ⓣⓔⓧⓣ Ⓑⓤⓑⓑⓛⓔⓢ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ ⓪①②③④⑤⑥⑦⑧⑨');
addFont('darkTextBubbles', '🅓🅐🅡🅚 🅣🅔🅧🅣 🅑🅤🅑🅑🅛🅔🅢', '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩 ⓿➊➋➌➍➎➏➐➑➒');

export default {
  data: new SlashCommandBuilder()
  .setName('font')
  .setDescription('Replace font whatever text you sent ;) to the one you chose')
  .addStringOption(option => option
  .setName('message')
  .setDescription('Enter message you want to apply the font :D')
  .setRequired(true))
  .addStringOption(option => option
  .setName('font')
  .setDescription('Pick the font you want to apply ;)')
  .addChoices(...fonts)
  .setRequired(true)),
  async execute(interaction, DEBUG_MODE) {
    const alphanumerics = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789'.split('');
    const font = interaction.options.getString('font', true);
    const message = Array.from(interaction.options.getString('message', true));
    const style = Array.from(styles.get(font));
    let content = '';
    
    for (const character of message) {
      const index = alphanumerics.indexOf(character);
      content += index === -1 ? character: style[index];
    }
    
    const embed = new EmbedBuilder()
    .setColor(0xFFFFFF)
    .setDescription(content);
    await interaction.reply({embeds: [embed]});
  }
};