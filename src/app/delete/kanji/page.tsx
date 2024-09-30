'use client';

import { Kanji } from '@/@types/globals';
import KanjiPreview from '@/components/KanjiPreview';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const KanjiDeletePage: FC = () => {
  const [allKanji, setAllKanji] = useState<Kanji[]>([]);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const loadingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/kanji', {
        signal: abortControllerRef.current?.signal,
      }).catch(() => undefined);

      if (response?.ok) {
        const newKanji: Kanji[] = await response.json();
        setAllKanji(newKanji);
        resolve();
      } else reject();
    });

    toast.promise(
      loadingPromise,
      {
        pending: 'Загрузка кандзи...',
        error: 'При загрузке кандзи возникла ошибка',
      },
      { toastId: 0 },
    );

    return () => abortControllerRef.current?.abort('useEffect cleanup');
  }, []);

  const deleteKanji = async (kanjiId: number) => {
    const deletePromise = new Promise<void>((resolve, reject) => {
      fetch('/api/kanji?' + new URLSearchParams({ id: kanjiId.toString() }), {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          setAllKanji((prev) => prev.filter((kanji) => kanji.KanjiId !== kanjiId));
          resolve();
        } else reject();
      });
    });

    const triedKanji = allKanji.find((kanji) => kanji.KanjiId === kanjiId)?.Character;
    toast.promise(deletePromise, {
      pending: `Удаление кандзи "${triedKanji ?? '?'}"...`,
      success: `Кандзи "${triedKanji ?? '?'}" удален`,
      error: `При удалении кандзи "${triedKanji ?? '?'}" возникла ошибка`,
    });
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      {allKanji.length ? (
        allKanji.map((kanji) => (
          <div key={kanji.KanjiId} className="flex gap-2">
            <KanjiPreview kanji={kanji} imageDisabled className="grow" />
            <button
              onClick={() => deleteKanji(kanji.KanjiId!)}
              className="w-12 border-slate-400 bg-slate-100 pt-1 text-xl leading-3"
            >
              ❌
            </button>
          </div>
        ))
      ) : (
        <h3 className="text-center text-2xl">Тут пока ничего нет</h3>
      )}
    </div>
  );
};
export default KanjiDeletePage;
