import Link from 'next/link';
import { FC } from 'react';

const NotFoundPage: FC = () => (
  <div className="flex min-h-full min-w-full flex-col items-center justify-center gap-4 pb-8">
    <h1 className="text-3xl font-bold">Страница не найдена</h1>
    <Link href="/" className="text-xl text-slate-600 hover:underline">
      Вернуться на главную
    </Link>
  </div>
);
export default NotFoundPage;
