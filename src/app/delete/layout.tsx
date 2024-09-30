import Navigation, { NavigationLink } from '@/components/Navigation';
import { FC, PropsWithChildren } from 'react';

const links: NavigationLink[] = [
  {
    title: 'Удаление слов',
    href: '/delete/words',
  },
  {
    title: 'Удаление кандзи',
    href: '/delete/kanji',
  },
  {
    title: 'Удаление радикалов',
    href: '/delete/radicals',
  },
  {
    title: 'Другие опции',
    href: '/',
    inactive: true,
  },
];

const DeletePageLayout: FC = ({ children }: PropsWithChildren) => (
  <>
    <Navigation links={links} />
    <div className="grow overflow-y-scroll">{children}</div>
  </>
);
export default DeletePageLayout;
