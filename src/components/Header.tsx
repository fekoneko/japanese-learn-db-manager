import Link from 'next/link';
import DbSwitch from './DbSwitch';

const Header = () => {
  return (
    <header className="z-50 grid grid-cols-3 items-center justify-items-center bg-teal-500 px-10 py-2 text-white shadow-md">
      <Link href="/" className="justify-self-start">
        <h1 role="banner" className="header">
          Авдеев Андрей А.
        </h1>
      </Link>
      <DbSwitch />
      <p className="justify-self-end text-white/70">ИВТ1-Б21</p>
    </header>
  );
};
export default Header;
