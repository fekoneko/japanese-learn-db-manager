import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer role="contentinfo" className="bg-slate-500 px-[10%] py-4 text-white/60 shadow-lg">
      <p>© 2023 - {new Date().getFullYear()} JapaneseLearn DB.</p>
      <p>Разработчик сайта: Авдеев Андрей, ИАТЭ НИЯУ МИФИ, группа ИВТ-Б21</p>
    </footer>
  );
};
export default Footer;
