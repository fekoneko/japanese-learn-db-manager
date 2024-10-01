import CalendarWidget from '@/components/CalendarWidget';
import RadioWidget from '@/components/RadioWidget';
import WeatherWidget from '@/components/WeatherWidget';
import { FC } from 'react';

const WidgetsPage: FC = () => (
  <div className="px-[10%]">
    <h1 className="mb-8 mt-10 text-center text-3xl font-semibold text-slate-600">
      Полезные виджеты
    </h1>

    <div className="flex flex-col items-center gap-8">
      <WeatherWidget />

      <div className="flex w-full gap-4">
        <div className="grow">
          <CalendarWidget />
        </div>
        <RadioWidget />
      </div>
    </div>
  </div>
);
export default WidgetsPage;
