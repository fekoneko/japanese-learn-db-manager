import RadicalAddForm from '@/components/RadicalAddForm';
import { FC } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Добавление радикалов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const RadicalAddPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <RadicalAddForm />
  </div>
);
export default RadicalAddPage;
