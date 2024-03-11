import Navigation, { NavigationLinkInfo } from '@/components/Navigation';

const linksInfo: NavigationLinkInfo[] = [
  {
    title: 'Другие опции',
    href: '/',
    inactive: true,
  },
];

interface StatsPageLayoutProps {
  children: React.ReactNode;
}
const SearchPageLayout = ({ children }: StatsPageLayoutProps) => {
  return (
    <>
      <Navigation linksInfo={linksInfo} />
      <div className="grow overflow-y-scroll">{children}</div>
    </>
  );
};
export default SearchPageLayout;
