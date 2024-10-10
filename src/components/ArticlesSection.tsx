import { FC } from 'react';
import LinkButton from '@/components/LinkButton';
import { articles } from '@/data/articles';

export interface ArticleSectionProps {
  maxArticles?: number;
}

const ArticlesSection: FC<ArticleSectionProps> = ({ maxArticles }) => (
  <section>
    {articles
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, maxArticles ?? articles.length)
      .map((article, index) => (
        <article key={index} className="mb-6">
          <LinkButton
            href={article.url}
            className="w-full border border-slate-500 bg-slate-100 px-6 pb-6 pt-8 text-left transition-all hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md [&:hover_span]:underline"
          >
            <h2 className="mb-2.5 text-2xl font-semibold text-slate-600">{article.title}</h2>
            <p className="text-justify">
              {article.teaser}... <span className="text-teal-700">Читать дальше</span>
            </p>
            <p className="text-right text-sm text-slate-400">
              {article.date.toLocaleDateString('ru')} в{' '}
              {article.date.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' })}
            </p>
          </LinkButton>
        </article>
      ))}
  </section>
);
export default ArticlesSection;
