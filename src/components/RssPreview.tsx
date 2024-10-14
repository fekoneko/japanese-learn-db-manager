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
    const abortController = new AbortController();
    const promise = new Promise((resolve, reject) => {
      abortController.signal.addEventListener('abort', resolve);
      rssParser.parseURL(src).then(setRssData).then(resolve).catch(reject);
    });

    toast.promise(promise, {
      pending: 'Получение RSS-фида...',
      error: 'При парсинге RSS-фида возникла ошибка',
    });

    return () => abortController.abort();
  }, [src]);

  if (!rssData) return null;

  return (
    <section>
      <h1 className="mt-10 text-center text-3xl font-semibold text-slate-600">{rssData.title}</h1>
      <p className="mb-8 text-center text-xl text-slate-400">предпросмотр фида</p>

      <LinkButton
        href={src}
        inNewTab
        className="mx-[12.5%] mb-6 w-3/4 border-slate-400 hover:bg-slate-300"
      >
        Подписаться на RSS-фид
      </LinkButton>

      <div className="grid grid-cols-2 gap-4">
        {rssData.items.map((article, index) => (
          <article key={index}>
            <LinkButton
              href={article.link}
              inNewTab
              className="size-full border border-slate-500 bg-slate-100 px-6 pb-6 pt-8 text-left transition-all hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md [&:hover_span]:underline"
            >
              <h2 className="mb-2.5 text-2xl font-semibold text-slate-600">{article.title}</h2>
              <p className="mb-2 overflow-hidden break-words text-justify">{article.content}</p>
              {article.enclosure?.type?.startsWith('audio') && (
                <audio controls preload="none" className="mb-2 w-full">
                  <source src={article.enclosure.url} type={article.enclosure.type} />
                </audio>
              )}

              <div className="flex justify-between gap-2">
                <p className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-right text-sm text-slate-400">
                  {article.link}
                </p>
                {article.isoDate && (
                  <p className="whitespace-nowrap text-sm text-slate-400">
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
      </div>
    </section>
  );
};
export default RssPreview;
