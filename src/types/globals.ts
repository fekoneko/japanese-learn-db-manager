export interface Word {
  WordId?: number;
  Word: string;
  Reading: string;
  PitchAccents?: number[];
  Meanings?: string[];
  Popularity?: number;
  OtherVariants?: string[];
  KanjiIds?: number[];
  KanjiCharacters?: string[];
}

export interface Kanji {
  KanjiId?: number;
  Character: string;
  Onyomi?: string[];
  Kunyomi?: string[];
  Meaning?: string;
  Popularity?: number;
  Image?: string;
  RadicalIds?: number[];
  RadicalCharacters?: string[];
}

export interface Radical {
  RadicalId?: number;
  Character: string;
  Keyword: string;
  DictionaryCode?: number;
  OtherVariants?: string[];
  Image?: string;
  CorrespondingKanjiId?: number;
  CorrespondingKanjiCharacter?: string;
}

export interface Stats {
  TotalKanji: number;
  TotalWords: number;
  TotalRadicals: number;
  KanjiFilled: number;
  WordsFilled: number;
}

export interface Article {
  url: string;
  title: string;
  teaser: string;
}
