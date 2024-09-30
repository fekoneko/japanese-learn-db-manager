import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => (
  <header className="z-30 flex items-center justify-center gap-4 bg-teal-500 px-[10%] pb-2.5 pt-1.5 text-white shadow-md">
    <Link href="/">
      <h1 role="banner" className="header">
        JapaneseLearn DB
      </h1>
    </Link>
    <span className="text-xl">/</span>
    <p className="text-xl">Японский - просто</p>
  </header>
);
export default Header;
