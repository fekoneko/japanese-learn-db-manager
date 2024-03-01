'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LinkInfo {
  title: string;
  href: string;
}
const linksInfo: LinkInfo[] = [
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
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav role="navigation">
      <ul className="flex">
        {linksInfo.map((linkInfo, index) => (
          <li
            key={index}
            className={`z-50 flex grow justify-center rounded-b transition-colors [clip-path:polygon(-100%_0,-100%_200%,200%_200%,200%_0)] ${pathname.startsWith(linkInfo.href) ? 'bg-white shadow-lg' : 'hover:bg-slate-200'}`}
          >
            <Link href={linkInfo.href} className="grow px-2 pb-1 pt-0.5 text-center">
              {linkInfo.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
