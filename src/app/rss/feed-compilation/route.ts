import { articles } from '@/data/articles';
import RSS from 'rss';

const siteUrl = 'https://japanese-learn-db-manager.vercel.app';

export const GET = async () => {
  const rss = new RSS({
    title: 'Подборка статей от Japanese Learn DB',
    description: 'RSS-фид с подборкой статей с различных сайтов',
    feed_url: `${siteUrl}/rss/feed-compilation`,
    site_url: siteUrl,
    language: 'ru',
    pubDate: new Date(),
  });

  articles.forEach((article) => {
    rss.item({
      title: article.title,
      description: `${article.teaser}... Читать далее по ссылке: ${siteUrl + article.url}`,
      url: siteUrl + article.url,
      date: article.date,
    });
  });

  return new Response(rss.xml(), {
    headers: { 'Content-Type': 'application/rss+xml' },
  });
};
