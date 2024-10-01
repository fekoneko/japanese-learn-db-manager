import ArticlesSection from '@/components/ArticlesSection';
import { FC } from 'react';

const BlogPage: FC = () => (
  <div className="px-[10%]">
    <h1 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Последние статьи
    </h1>

    <ArticlesSection />
  </div>
);
export default BlogPage;
