'use client';

import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import RssParser from 'rss-parser';
import LinkButton from './LinkButton';

type RssParserOutput = { [key: string]: any } & RssParser.Output<{ [key: string]: any }>;

export interface RssPreviewProps {
  src: string;
}

const rssParser = new RssParser();

const RssPreview: FC<RssPreviewProps> = ({ src }) => {
  const [rssData, setRssData] = useState<RssParserOutput | null>(null);

  useEffect(() => {
    const promise = rssParser.parseURL(src).then(setRssData);
    toast.promise(promise, {
      pending: 'Получение RSS-фида...',
      error: 'При парсинге RSS-фида возникла ошибка',
    });
  }, [src]);

  if (!rssData) return null;

  return (
    <section>
      <h1 className="mt-10 text-center text-3xl font-semibold text-slate-600">{rssData.title}</h1>
      <p className="mb-8 text-center text-xl text-slate-400">предпросмотр фида</p>

      {rssData.items.map((article, index) => (
        <article key={index} className="mb-6">
          <LinkButton
            href={article.link}
            className="w-full border border-slate-500 bg-slate-100 px-6 pb-6 pt-8 text-left transition-all hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md [&:hover_span]:underline"
          >
            <h2 className="mb-2.5 text-2xl font-semibold text-slate-600">{article.title}</h2>
            <p className="mb-2 text-justify">{article.content}</p>

            <div className="flex justify-between gap-2">
              <p className="text-right text-sm text-slate-400">{article.link}</p>
              {article.isoDate && (
                <p className="text-sm text-slate-400">
                  {new Date(article.isoDate).toLocaleDateString('ru')} в{' '}
                  {new Date(article.isoDate).toLocaleTimeString('ru', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </p>
              )}
            </div>
          </LinkButton>
        </article>
      ))}
    </section>
  );
};
export default RssPreview;
