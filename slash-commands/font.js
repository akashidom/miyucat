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
addFont('mathSans', '𝖬𝖺𝗍𝗁 𝖲𝖺𝗇𝗌', '𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹 0123456789');
addFont('scriptBoldItalic', '𝓢𝓬𝓻𝓲𝓹𝓽 𝓑𝓸𝓵𝓭 𝓘𝓽𝓪𝓵𝓲𝓬', '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩 0123456789');
addFont('lightTextBubbles', 'Ⓛⓘⓖⓗⓣ Ⓣⓔⓧⓣ Ⓑⓤⓑⓑⓛⓔⓢ', 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ ⓪①②③④⑤⑥⑦⑧⑨');
addFont('darkTextBubbles', '🅓🅐🅡🅚 🅣🅔🅧🅣 🅑🅤🅑🅑🅛🅔🅢', '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩 ⓿➊➋➌➍➎➏➐➑➒');
addFont('fraktur', '𝔉𝔯𝔞𝔨𝔱𝔲𝔯', '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ 0123456789');
addFont('fairytale', 'ᎦᏗᎥᏒᎩᏖᏗᏝᏋ', 'ᏗᏰፈᎴᏋᎦᎶᏂᎥᏠᏦᏝᎷᏁᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚᏗᏰፈᎴᏋᎦᎶᏂᎥᏠᏦᏝᎷᏁᎧᎮᎤᏒᏕᏖᏬᏉᏇጀᎩፚ 0123456789')
addFont('crypticItalic', '𐌂𐌓𐌙𐌐𐌕𐌉𐌂 𐌉𐌕𐌀𐌋𐌉𐌂', '𐌀𐌁𐌂𐌃𐌄𐌅Ᏽ𐋅𐌉Ꮭ𐌊𐌋𐌌𐌍Ꝋ𐌐𐌒𐌓𐌔𐌕𐌵ᕓᏔ𐋄𐌙Ɀ𐌀𐌁𐌂𐌃𐌄𐌅Ᏽ𐋅𐌉Ꮭ𐌊𐌋𐌌𐌍Ꝋ𐌐𐌒𐌓𐌔𐌕𐌵ᕓᏔ𐋄𐌙Ɀ Ꝋᛑᘖᙣᔦᔕᑳᒣზᖗ');

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