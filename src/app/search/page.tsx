import YandexSearchResults from '@/components/YandexSearchResults';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Поиск по сайту - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const SearchPage: FC = () => <YandexSearchResults />;
export default SearchPage;
