import Navigation, { NavigationLinkInfo } from '@/components/Navigation';
import { PropsWithChildren } from 'react';

const linksInfo: NavigationLinkInfo[] = [
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

const DeletePageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation linksInfo={linksInfo} />
      <div className="grow overflow-y-scroll">{children}</div>
    </>
  );
};
export default DeletePageLayout;
