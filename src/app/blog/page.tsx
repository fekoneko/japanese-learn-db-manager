import LinkButton from '@/components/LinkButton';
import { FC } from 'react';

interface ArticleLink {
  href: string;
  title: string;
  teaser: string;
}

const articles: ArticleLink[] = [
  {
    href: '/blog/how-to-read-japanese',
    title: 'Как читать по-японски',
    teaser:
      'В этой статье я расскажу вам о том, как читать по-японски. В этой статье я расскажу вам о том, как читать по-японски. В этой статье я расскажу вам о том, как читать по-японски. В этой статье я расскажу вам о том, как читать по-японски. В этой статье я расскажу вам',
  },
  {
    href: '/blog/what-is-kanji',
    title: 'Что такое кандзи и как их понимать',
    teaser:
      'В этой статье я расскажу вам о том, что такое кандзи и как их понимать. В этой статье я расскажу вам о том, что такое кандзи и как их понимать. В этой статье я расскажу вам о том, что такое кандзи и как их понимать. В этой статье я расскажу вам о том, что',
  },
];

const BlogPage: FC = () => (
  <div className="px-[10%]">
    <h1 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Последние статьи
    </h1>

    <section>
      {articles.map((article, index) => (
        <article key={index} className="mb-6">
          <LinkButton
            href="/blog/how-to-read-japanese"
            className="w-full border border-slate-500 px-6 py-4 text-left hover:bg-slate-300 [&:hover_span]:underline"
          >
            <h2 className="mb-2.5 text-2xl font-semibold text-slate-600">{article.title}</h2>
            <p>
              {article.teaser}... <span className="text-emerald-700">Читать дальше</span>
            </p>
          </LinkButton>
        </article>
      ))}
    </section>
  </div>
);
export default BlogPage;
