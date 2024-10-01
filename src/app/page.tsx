import Link from 'next/link';
import { FC } from 'react';

interface LinkGroup {
  title: string;
  links: { title: string; href: string }[];
}
const databaseSection: LinkGroup[] = [
  {
    title: 'Добавление',
    links: [
      { title: 'Добавление слов', href: '/add/words' },
      { title: 'Добавление кандзи', href: '/add/kanji' },
      { title: 'Добавление радикалов', href: '/add/radicals' },
    ],
  },
  {
    title: 'Удаление',
    links: [
      { title: 'Удаление слов', href: '/delete/words' },
      { title: 'Удаление кандзи', href: '/delete/kanji' },
      { title: 'Удаление радикалов', href: '/delete/radicals' },
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
    title: 'Статистика',
    links: [{ title: 'Статистика', href: '/stats' }],
  },
];

const HomePage: FC = () => (
  <div className="min-h-full min-w-full px-[10%]">
    <h1 className="my-3 mb-2 mt-10 flex flex-col">
      <span className="text-center text-3xl text-slate-600">Добро пожаловать на</span>
      <span className="text-center text-5xl font-semibold text-slate-600">JapaneseLearn DB!</span>
    </h1>

    <p role="contentinfo" className="mb-10 px-24 text-center">
      На этом сайте собрана подробная информация о писменности японского языка! Мы предоставляем
      удобный поиск по <span className="rounded border-2 border-slate-400 px-1 pb-1">словам</span>,{' '}
      <span className="rounded border-2 border-slate-400 px-1 pb-1">кандзи</span> и{' '}
      <span className="rounded border-2 border-slate-400 px-1 pb-1">радикалам</span>. Информация
      берётся из проверенных источников и обновляется регулярно.
    </p>

    <section className="mb-6 flex flex-col gap-6">
      <h2 className="text-center text-2xl text-slate-600">Инструменты базы данных</h2>
      {databaseSection.map((group, sectionIndex) => (
        <div key={sectionIndex} className="rounded border-2 border-dashed border-slate-400 p-2">
          <h3 className="-mt-6 ml-5 w-1/3 max-w-[15rem] rounded border-2 border-teal-500 bg-slate-200 py-0.5 text-center font-bold text-teal-700">
            {group.title}
          </h3>

          <ul className="flex pb-3">
            {group.links.map((link, linkIndex) => (
              <li
                key={linkIndex}
                className="z-50 flex grow basis-0 justify-center rounded transition-colors hover:bg-slate-100"
              >
                <Link href={link.href} className="grow p-2 text-center">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  </div>
);
export default HomePage;
