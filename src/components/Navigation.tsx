'use client';

import { articles } from '@/data/articles';
import { link, truncate } from 'fs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavigationLink {
  title: string;
  href: string;
  truncate?: boolean;
}

interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}

const links: (NavigationLink | NavigationGroup)[] = [
  { title: 'Главная', href: '/' },
  {
    title: 'Блог',
    links: [
      { title: 'Все статьи', href: '/blog' },
      ...articles.map(({ title, url }) => ({ title, href: url, truncate: true })),
    ],
  },
  {
    title: 'Поиск',
    links: [
      { title: 'Поиск слов', href: '/search/words' },
      { title: 'Поиск кандзи', href: '/search/kanji' },
      { title: 'Поиск радикалов', href: '/search/radicals' },
    ],
  },
  {
    title: 'Администрирование',
    links: [
      { title: 'Добавление слов', href: '/add/words' },
      { title: 'Добавление кандзи', href: '/add/kanji' },
      { title: 'Добавление радикалов', href: '/add/radicals' },
      { title: 'Удаление слов', href: '/delete/words' },
      { title: 'Удаление кандзи', href: '/delete/kanji' },
      { title: 'Удаление радикалов', href: '/delete/radicals' },
    ],
  },
  {
    title: 'Другое',
    links: [
      { title: 'Виджеты', href: '/widgets' },
      { title: 'Статистика по БД', href: '/stats' },
    ],
  },
];

const isGroup = (link: NavigationLink | NavigationGroup): link is NavigationGroup =>
  'links' in link;

const Navigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav role="navigation">
      <ul className="flex bg-slate-200 px-[10%]">
        {links.map((linkOrGroup, index) => {
          const isActive = (isGroup(linkOrGroup) ? linkOrGroup.links : [linkOrGroup]).some(
            (link) => pathname === link.href,
          );

          return (
            <li
              key={index}
              className={
                'relative z-40 grow basis-0 rounded-b transition-colors hover:bg-slate-300' +
                (isActive ? ' !bg-teal-500 text-white shadow-md' : '')
              }
            >
              {isGroup(linkOrGroup) ? (
                <>
                  <p className="cursor-pointer px-2 pb-1 pt-0.5 text-center">{linkOrGroup.title}</p>

                  <ul className="absolute left-0 top-full flex max-h-0 min-h-0 w-full flex-col overflow-hidden rounded bg-slate-300 text-black shadow-lg transition-all [:hover>&]:max-h-96">
                    {linkOrGroup.links.map((link, index) => (
                      <li
                        key={index}
                        className="z-50 rounded-b border-t border-slate-400 py-1 transition-colors hover:bg-white/50"
                      >
                        <Link
                          href={link.href}
                          className={
                            'block px-2 pb-1 pt-0.5 text-center' +
                            (link.truncate ? ' truncate whitespace-nowrap' : '')
                          }
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={linkOrGroup.href}
                  className={
                    'block w-full px-2 pb-1 pt-0.5 text-center' +
                    (linkOrGroup.truncate ? ' truncate whitespace-nowrap' : '')
                  }
                >
                  {linkOrGroup.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navigation;
