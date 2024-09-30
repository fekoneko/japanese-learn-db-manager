import Link from 'next/link';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="z-50 flex items-center justify-between bg-teal-500 px-8 py-2 text-white shadow-md">
      <Link href="/">
        <h1 role="banner" className="header">
          Авдеев Андрей А.
        </h1>
      </Link>
      <p className="text-white/70">ИВТ1-Б21</p>
    </header>
  );
};
export default Header;
