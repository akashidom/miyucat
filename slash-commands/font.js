

import {
  SlashCommandBuilder
} from 'discord.js';

const fonts = [{
  label: 'Ⓛⓘⓖⓗⓣ Ⓣⓔⓧⓣ Ⓑⓤⓑⓑⓛⓔⓢ', value: 'lightTextBubbles'
},
{
  label: '🅓🅐🅡🅚 🅣🅔🅧🅣 🅑🅤🅑🅑🅛🅔🅢', value: 'darkTextBubbles'
}];
const styles = {
  lightTextBubbles: 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ ⓪①②③④⑤⑥⑦⑧⑨',
  darkTextBubbles: '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩 ⓿➊➋➌➍➎➏➐➑➒'
};

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
    const alphanumerics = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
    const font = interaction.options.getString('font', true);
    const message = interaction.options.getString('message', true);
    const style = styles[font];
  }
};