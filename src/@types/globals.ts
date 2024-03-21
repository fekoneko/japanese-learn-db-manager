export interface Word {
  WordId?: number;
  Word: string;
  Reading: string;
  PitchAccents?: number[];
  Meanings?: string[];
  Popularity?: number;
  OtherVariants?: string[];
  KanjiIds?: number[];
}

export interface Kanji {
  KanjiId?: number;
  Character: string;
  Onyomi?: string[];
  Kunyomi?: string[];
  Meaning?: string;
  Popularity?: number;
  RadicalIds?: number[];
}

export interface Radical {
  RadicalId?: number;
  Character: string;
  CorrespondingKanjiId?: number;
  Keyword: string;
  DictionaryCode?: number;
  OtherVariants?: string[];
}

export interface Stats {
  TotalKanji: number;
  TotalWords: number;
  TotalRadicals: number;
  KanjiFilled: number;
  WordsFilled: number;
}
