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
    <>
      <Navigation linksInfo={linksInfo} />
      <div className="grow overflow-y-scroll">{children}</div>
    </>
  );
};
export default AddPageLayout;
