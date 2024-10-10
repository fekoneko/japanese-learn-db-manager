import Link from 'next/link';
import { FC } from 'react';
import YandexSerch from './YandexSerch';
import UserButton from './UserButton';
import { signOut } from '@/lib/auth';

const Header: FC = () => (
  <header className="z-30 flex flex-col items-center justify-between gap-2 bg-teal-500 px-[10%] pb-2.5 pt-1.5 text-white shadow-md md:flex-row">
    <div className="flex items-center gap-3">
      <Link href="/">
        <h1 role="banner" className="header whitespace-nowrap">
          JapaneseLearn DB
        </h1>
      </Link>
      <span className="hidden text-xl sm:block md:hidden lg:block">/</span>
      <p className="hidden whitespace-nowrap text-xl sm:block md:hidden lg:block">
        Японский - просто
      </p>
    </div>

    <div className="flex items-center gap-2">
      <div className="grow" />
      <YandexSerch />
      <UserButton
        onSignOut={async () => {
          'use server';

          await signOut({ redirectTo: '/sign-in' });
        }}
      />
    </div>
  </header>
);
export default Header;
