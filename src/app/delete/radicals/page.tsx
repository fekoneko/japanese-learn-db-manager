import RadicalsDeleteUI from '@/components/RadicalsDeleteUI';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Удаление радикалов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const RadicalsDeletePage: FC = () => <RadicalsDeleteUI />;
export default RadicalsDeletePage;
