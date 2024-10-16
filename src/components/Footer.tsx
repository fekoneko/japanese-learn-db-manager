import { FC } from 'react';
import YandexInformer from './YandexInformer';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="flex items-center justify-between gap-2 bg-slate-500 px-[10%] py-4 text-white/60 shadow-lg"
    >
      <div>
        <p>© 2024{currentYear > 2024 && ' - ' + currentYear} JapaneseLearn DB.</p>
        <p>Разработчик сайта: Авдеев Андрей, ИАТЭ НИЯУ МИФИ, группа ИВТ-Б21</p>
      </div>
      <YandexInformer />
    </footer>
  );
};
export default Footer;
