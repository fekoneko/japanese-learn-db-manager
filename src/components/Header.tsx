import Link from 'next/link';

const Header = () => {
  return (
    <header className="z-50 flex items-center justify-between bg-white px-8 py-2 shadow-lg">
      <Link href="/">
        <h1 role="banner" className="header">
          Авдеев Андрей А.
        </h1>
      </Link>
      <p className="text-slate-500">ИВТ1-Б21</p>
    </header>
  );
};
export default Header;
