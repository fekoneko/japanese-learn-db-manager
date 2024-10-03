import CalendarWidget from '@/components/CalendarWidget';
import RadioWidget from '@/components/RadioWidget';
import TRexGameWidget from '@/components/TRexGameWidget';
import WeatherWidget from '@/components/WeatherWidget';
import { FC } from 'react';

const WidgetsPage: FC = () => (
  <div className="px-[10%] pb-8">
    <h1 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Полезные виджеты
    </h1>

    <div className="flex flex-col items-center gap-8">
      <WeatherWidget />

      <div className="flex w-full justify-center gap-4">
        <div className="max-w-[50rem] basis-[50rem]">
          <CalendarWidget />
        </div>
        <RadioWidget />
      </div>

      <TRexGameWidget />
    </div>
  </div>
);
export default WidgetsPage;
