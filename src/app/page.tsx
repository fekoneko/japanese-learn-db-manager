import ArticlesSection from '@/components/ArticlesSection';
import DatabaseToolsSection from '@/components/DatabaseToolsSection';
import { FC } from 'react';

const HomePage: FC = () => (
  <div>
    <h1 className="mb-6 mt-10 flex flex-col">
      <span className="text-center text-3xl text-slate-600">Добро пожаловать на</span>
      <span className="text-center text-5xl font-semibold text-slate-600">JapaneseLearn DB!</span>
    </h1>

    <p role="contentinfo" className="mb-10 px-[10%] text-center leading-7">
      На этом сайте собрана подробная информация о писменности японского языка! Мы предоставляем
      удобный поиск по <span className="rounded border-2 border-slate-400 px-1 pb-1">словам</span>,{' '}
      <span className="rounded border-2 border-slate-400 px-1 pb-1">кандзи</span> и{' '}
      <span className="rounded border-2 border-slate-400 px-1 pb-1">радикалам</span>. Информация
      берётся из проверенных источников и обновляется регулярно.
    </p>
    <hr className="mx-[10%] mt-14 border-t-[1.5px] border-slate-400" />

    <h2 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Последние статьи
    </h2>
    <ArticlesSection />
    <hr className="mx-[10%] mt-14 border-t-[1.5px] border-slate-400" />

    <h2 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Инструменты базы данных
    </h2>
    <DatabaseToolsSection />
  </div>
);
export default HomePage;
