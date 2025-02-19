// Add these at the top of the file
export interface HiraganaChar {
    character: string;
    romaji: string;
  }
  
export const baseHiraganaData = {
    hiragana: [
      // Basic Hiragana (あ行 to わ行)
      { character: "あ", romaji: "a" },
      { character: "い", romaji: "i" },
      { character: "う", romaji: "u" },
      { character: "え", romaji: "e" },
      { character: "お", romaji: "o" },
      { character: "か", romaji: "ka" },
      { character: "き", romaji: "ki" },
      { character: "く", romaji: "ku" },
      { character: "け", romaji: "ke" },
      { character: "こ", romaji: "ko" },
      { character: "さ", romaji: "sa" },
      { character: "し", romaji: "shi" },
      { character: "す", romaji: "su" },
      { character: "せ", romaji: "se" },
      { character: "そ", romaji: "so" },
      { character: "た", romaji: "ta" },
      { character: "ち", romaji: "chi" },
      { character: "つ", romaji: "tsu" },
      { character: "て", romaji: "te" },
      { character: "と", romaji: "to" },
      { character: "な", romaji: "na" },
      { character: "に", romaji: "ni" },
      { character: "ぬ", romaji: "nu" },
      { character: "ね", romaji: "ne" },
      { character: "の", romaji: "no" },
      { character: "は", romaji: "ha" },
      { character: "ひ", romaji: "hi" },
      { character: "ふ", romaji: "fu" },
      { character: "へ", romaji: "he" },
      { character: "ほ", romaji: "ho" },
      { character: "ま", romaji: "ma" },
      { character: "み", romaji: "mi" },
      { character: "む", romaji: "mu" },
      { character: "め", romaji: "me" },
      { character: "も", romaji: "mo" },
      { character: "や", romaji: "ya" },
      { character: "ゆ", romaji: "yu" },
      { character: "よ", romaji: "yo" },
      { character: "ら", romaji: "ra" },
      { character: "り", romaji: "ri" },
      { character: "る", romaji: "ru" },
      { character: "れ", romaji: "re" },
      { character: "ろ", romaji: "ro" },
      { character: "わ", romaji: "wa" },
      { character: "を", romaji: "wo" },
      { character: "ん", romaji: "n" },
    ] as HiraganaChar[]
};

export const dakutenHiraganaData = {
  hiragana: [
    // Dakuten variations (が行 to ぽ行)
    { character: "が", romaji: "ga" },
    { character: "ぎ", romaji: "gi" },
    { character: "ぐ", romaji: "gu" },
    { character: "げ", romaji: "ge" },
    { character: "ご", romaji: "go" },
    { character: "ざ", romaji: "za" },
    { character: "じ", romaji: "ji" },
    { character: "ず", romaji: "zu" },
    { character: "ぜ", romaji: "ze" },
    { character: "ぞ", romaji: "zo" },
    { character: "だ", romaji: "da" },
    { character: "ぢ", romaji: "ji" },
    { character: "づ", romaji: "zu" },
    { character: "で", romaji: "de" },
    { character: "ど", romaji: "do" },
    { character: "ば", romaji: "ba" },
    { character: "び", romaji: "bi" },
    { character: "ぶ", romaji: "bu" },
    { character: "べ", romaji: "be" },
    { character: "ぼ", romaji: "bo" },
    { character: "ぱ", romaji: "pa" },
    { character: "ぴ", romaji: "pi" },
    { character: "ぷ", romaji: "pu" },
    { character: "ぺ", romaji: "pe" },
    { character: "ぽ", romaji: "po" },
  ] as HiraganaChar[]
};

export const hiraganaData = {
    hiragana: [
      ...baseHiraganaData.hiragana,
      ...dakutenHiraganaData.hiragana,
    ] as HiraganaChar[]
  };


export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
