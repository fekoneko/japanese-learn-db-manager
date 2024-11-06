import { getCustomPosts, getRssSources } from '@/lib/db';
import RSS, { ItemOptions } from 'rss';
import RssParser from 'rss-parser';

const siteUrl = 'https://japanese-learn-db-manager.vercel.app';

const rssParser = new RssParser();

export const GET = async () => {
  const sourses = await getRssSources();

  const rss = new RSS({
    title: 'Пользовательский фид - Japanese Learn DB',
    description: 'RSS-фид, собранный пользователем',
    feed_url: `${siteUrl}/rss/custom-feed`,
    site_url: siteUrl,
    language: 'ru',
    pubDate: new Date(),
  });

  const articlesPromise = Promise.allSettled(
    sourses.map((source) => rssParser.parseURL(source)),
  ).then((results) =>
    results
      .map((result) => (result.status === 'fulfilled' ? result.value.items : null))
      .filter((data) => data !== null)
      .flat(),
  );

  const customPostsPromise = getCustomPosts();

  const [articles, customPosts] = await Promise.all([articlesPromise, customPostsPromise]);

  const rssItems: ItemOptions[] = [
    ...articles.map((article) => ({
      title: article!.title ?? 'Без названия',
      description: article!.contentSnippet ?? article!.content ?? 'Без описания',
      url: article!.link ?? '#',
      date: article!.isoDate ?? new Date(),
      enclosure: article!.enclosure,
    })),
    ...customPosts.map((customPost) => ({
      title: customPost.title,
      description: customPost.content,
      url: siteUrl,
      date: customPost.date,
    })),
  ].sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime());

  rssItems.forEach((item) => rss.item(item));

  return new Response(rss.xml(), {
    headers: { 'Content-Type': 'application/rss+xml' },
  });
};
