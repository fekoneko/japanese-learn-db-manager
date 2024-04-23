'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavigationLinkInfo {
  title: string;
  href: string;
  inactive?: boolean;
}

interface NavigationProps {
  linksInfo: NavigationLinkInfo[];
}
const Navigation = ({ linksInfo }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav role="navigation">
      <ul className="flex">
        {linksInfo.map((linkInfo, index) => (
          <li
            key={index}
            className={`z-50 flex grow justify-center rounded-b transition-colors [clip-path:polygon(-100%_0,-100%_200%,200%_200%,200%_0)] ${!linkInfo.inactive && pathname.startsWith(linkInfo.href) ? 'bg-teal-500 text-white shadow-md' : 'hover:bg-white/50'}`}
          >
            <Link href={linkInfo.href} className="grow basis-0 px-2 pb-1 pt-0.5 text-center">
              {linkInfo.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default Navigation;
