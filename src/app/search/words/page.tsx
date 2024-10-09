import WordsSearchUI from '@/components/WordsSearchUI';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Поиск слов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const WordsSearchPage: FC = () => <WordsSearchUI />;
export default WordsSearchPage;
