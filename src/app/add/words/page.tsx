import WordAddForm from '@/components/WordAddForm';
import { FC } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Добавление слов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const WordAddPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <WordAddForm />
  </div>
);
export default WordAddPage;
