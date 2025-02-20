import hiraganas from "../data/hiragana-translation.json";

export interface HiraganaChar {
  character: string;
  romaji: string;
}

export const hiraganaData = {
  hiragana: [
    ...(hiraganas.regular as HiraganaChar[]),
    ...(hiraganas.dakuten as HiraganaChar[]),
  ] as HiraganaChar[],
  regularHiragana: hiraganas.regular as HiraganaChar[],
  dakutenHiragana: hiraganas.dakuten as HiraganaChar[],
};
