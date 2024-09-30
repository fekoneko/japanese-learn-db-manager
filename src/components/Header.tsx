import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => (
  <header className="z-30 flex items-center justify-between bg-teal-500 px-[10%] py-2 text-white shadow-md">
    <Link href="/">
      <h1 role="banner" className="header">
        JapaneseLearn DB
      </h1>
    </Link>
  </header>
);
export default Header;
