import Navigation, { NavigationLinkInfo } from '@/components/Navigation';

const linksInfo: NavigationLinkInfo[] = [
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
  {
    title: 'Другие опции',
    href: '/',
    inactive: true,
  },
];

interface AddPageLayoutProps {
  children: React.ReactNode;
}
const AddPageLayout = ({ children }: AddPageLayoutProps) => {
  return (
    <div className="w-100 h-100 overflow-y-scroll">
      <Navigation linksInfo={linksInfo} />
      {children}
    </div>
  );
};
export default AddPageLayout;
