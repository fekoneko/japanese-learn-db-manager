import Link from 'next/link';

interface SectionInfo {
  title: string;
  links: LinkInfo[];
}
interface LinkInfo {
  title: string;
  href: string;
}
const sectionsInfo: SectionInfo[] = [
  {
    title: 'Добавление',
    links: [
      {
        title: 'Добавление слов',
        href: '/add/words',
      },
      {
        title: 'Добавление кандзи',
        href: '/add/kanji',
      },
      {
        title: 'Добавление радикалов',
        href: '/add/radicals',
      },
    ],
  },
  {
    title: 'Удаление',
    links: [
      {
        title: 'Удаление слов',
        href: '/delete/words',
      },
      {
        title: 'Удаление кандзи',
        href: '/delete/kanji',
      },
      {
        title: 'Удаление радикалов',
        href: '/delete/radicals',
      },
    ],
  },
  {
    title: 'Поиск',
    links: [
      {
        title: 'Поиск слов',
        href: '/search/words',
      },
      {
        title: 'Поиск кандзи',
        href: '/search/kanji',
      },
      {
        title: 'Поиск радикалов',
        href: '/search/radicals',
      },
    ],
  },
  {
    title: 'Статистика',
    links: [
      {
        title: 'Статистика',
        href: '/stats',
      },
    ],
  },
];

const HomePage = () => {
  return (
    <div className="flex min-h-full min-w-full flex-col gap-10 px-[15%] py-4">
      <h1 className="text-center text-3xl text-slate-600">JapaneseLearn DB</h1>
      {sectionsInfo.map((sectionInfo, sectionIndex) => (
        <section key={sectionIndex} className="rounded border-2 border-dashed border-slate-400 p-2">
          <h2 className="-mt-6 ml-5 w-1/3 max-w-[15rem] rounded border-2 border-teal-500 bg-slate-200 py-0.5 text-center font-bold text-teal-700">
            {sectionInfo.title}
          </h2>
          <ul className="flex">
            {sectionInfo.links.map((linkInfo, linkIndex) => (
              <li
                key={linkIndex}
                className="z-50 flex grow basis-0 justify-center rounded transition-colors hover:bg-slate-100"
              >
                <Link href={linkInfo.href} className="grow p-2 text-center">
                  {linkInfo.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};
export default HomePage;
