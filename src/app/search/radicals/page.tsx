import RadicalsSearchUI from '@/components/RadicalsSearchUI';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Поиск радикалов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const RadicalsSearchPage: FC = () => <RadicalsSearchUI />;
export default RadicalsSearchPage;
