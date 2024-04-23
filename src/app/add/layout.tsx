import Navigation, { NavigationLinkInfo } from '@/components/Navigation';
import { PropsWithChildren } from 'react';

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

const AddPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation linksInfo={linksInfo} />
      <div className="grow overflow-y-scroll">{children}</div>
    </>
  );
};
export default AddPageLayout;
