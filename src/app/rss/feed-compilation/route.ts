import RSS from 'rss';
import RssParser from 'rss-parser';

const siteUrl = 'https://japanese-learn-db-manager.vercel.app';

const sourses = [
  `${siteUrl}/rss/blog`,
  'https://krakozyabr.ru/feed/',
  'https://nihongoconteppei.com/feed/podcast',
];

const rssParser = new RssParser();

export const GET = async () => {
  const rss = new RSS({
    title: 'Подборка статей от Japanese Learn DB',
    description: 'RSS-фид с подборкой статей с различных сайтов',
    feed_url: `${siteUrl}/rss/feed-compilation`,
    site_url: siteUrl,
    language: 'ru',
    pubDate: new Date(),
  });

  const articles = await Promise.allSettled(
    sourses.map((source) => rssParser.parseURL(source)),
  ).then((results) =>
    results
      .map((result) => (result.status === 'fulfilled' ? result.value.items : null))
      .filter((data) => data !== null)
      .flat()
      .sort((left, right) =>
        left!.isoDate && right!.isoDate
          ? new Date(right!.isoDate).getTime() - new Date(left!.isoDate).getTime()
          : 0,
      ),
  );

  articles.forEach((article) => {
    rss.item({
      title: article.title ?? 'Без названия',
      description: article.contentSnippet ?? article.content ?? 'Без описания',
      url: article.link ?? '#',
      date: article.isoDate ?? new Date(),
      enclosure: article.enclosure,
    });
  });

  return new Response(rss.xml(), {
    headers: { 'Content-Type': 'application/rss+xml' },
  });
};
