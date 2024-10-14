import ArticlesSection from '@/components/ArticlesSection';
import { FC } from 'react';

import { Metadata } from 'next';
import LinkButton from '@/components/LinkButton';

export const metadata: Metadata = {
  title: 'Блог - Japanese Learn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const BlogPage: FC = () => (
  <div>
    <h1 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Последние статьи
    </h1>

    <LinkButton
      href="/rss/blog/preview"
      className="mx-[12.5%] mb-6 w-3/4 border-slate-400 hover:bg-slate-300"
    >
      Подписаться на RSS-фид блога
    </LinkButton>

    <ArticlesSection />
  </div>
);
export default BlogPage;
