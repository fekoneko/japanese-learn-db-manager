'use client';

import { Stats } from '@/types/globals';
import { Chart } from 'chart.js/auto';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

Chart.register();

interface StatsChartProps {
  stats: Stats;
}
const StatsChart: FC<StatsChartProps> = ({ stats }) => (
  <Bar
    data={{
      labels: [
        `Всего слов: ${stats.TotalWords} (${Math.round(
          (stats.WordsFilled / stats.TotalWords) * 100,
        )}%)`,
        `Всего кандзи: ${stats.TotalKanji} (${Math.round(
          (stats.KanjiFilled / stats.TotalKanji) * 100,
        )}%)`,
        `Всего радикалов: ${stats.TotalRadicals} (100%)`,
      ],
      datasets: [
        {
          label: 'Всего',
          data: [stats.TotalWords, stats.TotalKanji, stats.TotalRadicals],
        },
        {
          label: 'Полностью заполнено',
          data: [stats.WordsFilled, stats.KanjiFilled, stats.TotalRadicals],
        },
      ],
    }}
  />
);
export default StatsChart;
