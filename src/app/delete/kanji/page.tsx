import KanjiDeleteUI from '@/components/KanjiDeleteUI';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Удаление кандзи - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const KanjiDeletePage: FC = () => <KanjiDeleteUI />;
export default KanjiDeletePage;
