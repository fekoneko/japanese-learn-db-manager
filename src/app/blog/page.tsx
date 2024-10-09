import ArticlesSection from '@/components/ArticlesSection';
import { FC } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Блог - Japanese Learn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const BlogPage: FC = () => (
  <div>
    <h1 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Последние статьи
    </h1>

    <ArticlesSection />
  </div>
);
export default BlogPage;
