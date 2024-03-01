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
    <div className="w-100 h-100 overflow-y-scroll">
      <Navigation linksInfo={linksInfo} />
      {children}
    </div>
  );
};
export default SearchPageLayout;
