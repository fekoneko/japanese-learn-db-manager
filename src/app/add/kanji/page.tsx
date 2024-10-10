import KanjiAddForm from '@/components/KanjiAddForm';
import { FC } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Добавление кандзи - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const KanjiAddPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <KanjiAddForm />
  </div>
);
export default KanjiAddPage;
