import Navigation, { NavigationLink } from '@/components/Navigation';
import { FC, PropsWithChildren } from 'react';

const links: NavigationLink[] = [
  {
    title: 'Другие опции',
    href: '/',
    inactive: true,
  },
];

const SearchPageLayout: FC = ({ children }: PropsWithChildren) => (
  <>
    <Navigation links={links} />
    <div className="grow overflow-y-scroll">{children}</div>
  </>
);
export default SearchPageLayout;
