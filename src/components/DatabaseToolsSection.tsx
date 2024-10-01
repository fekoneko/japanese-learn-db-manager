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
  <section className="mb-6 flex flex-col gap-6">
    {linkGroups.map((group, sectionIndex) => (
      <div key={sectionIndex} className="rounded border-2 border-dashed border-slate-400 p-2">
        <h3 className="-mt-6 ml-5 w-1/3 max-w-[15rem] rounded border-2 border-teal-500 bg-slate-200 py-0.5 text-center font-bold text-teal-700">
          {group.title}
        </h3>

        <ul className="flex">
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
);
export default DatabaseToolsSection;
