import Navigation, { NavigationLinkInfo } from '@/components/Navigation';

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

interface AddPageLayoutProps {
  children: React.ReactNode;
}
const SearchPageLayout = ({ children }: AddPageLayoutProps) => {
  return (
    <>
      <Navigation linksInfo={linksInfo} />
      <div className="grow overflow-y-scroll">{children}</div>
    </>
  );
};
export default SearchPageLayout;
