import KanjiSearchUI from '@/components/KanjiSearchUI';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Поиск кандзи - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const KanjiSearchPage: FC = () => <KanjiSearchUI />;
export default KanjiSearchPage;
