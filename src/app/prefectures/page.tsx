import { FC } from 'react';
import PrefecturesTable from '@/components/PrefecturesTable';
import PrefecturesMap from '@/assets/prefectures-map.svg';

const PrefecturesPage: FC = () => (
  <div className="flex flex-col items-center gap-8 py-10">
    <h1 className="text-center text-3xl font-semibold text-slate-600">Префектуры Японии</h1>

    <PrefecturesTable />

    <div className="rounded-md border border-slate-400 p-4">
      <PrefecturesMap />
    </div>
  </div>
);
export default PrefecturesPage;
