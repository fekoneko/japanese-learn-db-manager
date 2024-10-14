import Link from 'next/link';
import { FC } from 'react';

interface LinkGroup {
  title: string;
  links: { title: string; href: string }[];
}
const linkGroups: LinkGroup[] = [
  {
    title: 'Поиск',
    links: [
      { title: 'Поиск слов', href: '/search/words' },
      { title: 'Поиск кандзи', href: '/search/kanji' },
      { title: 'Поиск радикалов', href: '/search/radicals' },
    ],
  },
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
    title: 'Статистика',
    links: [{ title: 'Статистика', href: '/stats' }],
  },
];

const DatabaseToolsSection: FC = () => (
  <section className="mb-6 flex flex-col gap-10">
    {linkGroups.map((group, sectionIndex) => (
      <div
        key={sectionIndex}
        className="rounded-xl border-[1.5px] border-dashed border-slate-400 bg-slate-100 px-4 pb-4 pt-3"
      >
        <h3 className="mx-auto -mt-7 mb-1 w-1/3 max-w-[15rem] rounded-full border border-slate-500 bg-slate-100 py-0.5 text-center font-semibold text-slate-500 shadow-lg">
          {group.title}
        </h3>

        <ul className="flex">
          {group.links.map((link, linkIndex) => (
            <li
              key={linkIndex}
              className="flex grow basis-0 justify-center rounded-lg transition-colors hover:bg-slate-200"
            >
              <Link href={link.href} className="grow p-3 text-center">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </section>
);
export default DatabaseToolsSection;
