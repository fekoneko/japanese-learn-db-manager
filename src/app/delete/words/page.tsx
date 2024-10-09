import WordsDeleteUI from '@/components/WordsDeleteUI';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Удаление слов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const WordsDeletePage: FC = () => <WordsDeleteUI />;
export default WordsDeletePage;
