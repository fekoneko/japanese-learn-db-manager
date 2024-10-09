import { Stats } from '@/types/globals';
import StatsChart from '@/components/StatsChart';
import { sql } from '@vercel/postgres';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Статистика по БД - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const getStats = async (): Promise<Stats | null> => {
  try {
    const dbResponse = await sql<Stats>`
      SELECT
        CAST((SELECT COUNT(*) FROM public."Kanji") AS INT) AS "TotalKanji",
        CAST((SELECT COUNT(*) FROM public."Words") AS INT) AS "TotalWords",
        CAST((SELECT COUNT(*) FROM public."Radicals") AS INT) AS "TotalRadicals",
        CAST((
          SELECT COUNT(*) FROM public."Kanji"
          WHERE ("Onyomi" IS NOT NULL or "Kunyomi" IS NOT NULL) AND "Meaning" IS NOT NULL
        ) AS FLOAT) AS "KanjiFilled",
        CAST((
          SELECT COUNT(*) FROM public."Words"
          WHERE "Meanings" IS NOT NULL
        ) AS FLOAT) AS "WordsFilled"
    `;

    console.log(dbResponse.rows[0]);

    return dbResponse.rows[0];
  } catch (error: any) {
    return null;
  }
};

const StatsPage = async () => {
  const stats = await getStats();

  return (
    <div className="flex min-h-full min-w-full flex-col gap-10 px-[5%] py-4 md:px-[15%]">
      <h1 className="text-center text-3xl text-slate-600">Статистика</h1>
      {stats ? (
        <div className="flex h-[55dvh] min-h-[150px] justify-center">
          <StatsChart stats={stats} />
        </div>
      ) : (
        <h3 className="text-center text-2xl">Возникла ошибка</h3>
      )}
    </div>
  );
};
export default StatsPage;
