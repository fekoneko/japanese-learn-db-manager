import Navigation, { NavigationLink } from '@/components/Navigation';
import { FC, PropsWithChildren } from 'react';

const links: NavigationLink[] = [
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

const AddPageLayout: FC = ({ children }: PropsWithChildren) => (
  <>
    <Navigation links={links} />
    <div className="grow overflow-y-scroll">{children}</div>
  </>
);
export default AddPageLayout;
