import Navigation, { NavigationLinkInfo } from '@/components/Navigation';
import { PropsWithChildren } from 'react';

const linksInfo: NavigationLinkInfo[] = [
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
  {
    title: 'Другие опции',
    href: '/',
    inactive: true,
  },
];

const SearchPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation linksInfo={linksInfo} />
      <div className="grow overflow-y-scroll">{children}</div>
    </>
  );
};
export default SearchPageLayout;
