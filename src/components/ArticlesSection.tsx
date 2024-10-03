import { FC } from 'react';
import LinkButton from '@/components/LinkButton';
import { articles } from '@/data/articles';

const ArticlesSection: FC = () => (
  <section>
    {articles.map((article, index) => (
      <article key={index} className="mb-6">
        <LinkButton
          href={article.url}
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
);
export default ArticlesSection;
