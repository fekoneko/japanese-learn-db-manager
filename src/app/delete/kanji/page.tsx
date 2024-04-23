'use client';

import { Kanji } from '@/@types/globals';
import KanjiPreview from '@/components/KanjiPreview';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const KanjiDeletePage = () => {
  const [allKanji, setAllKanji] = useState<Kanji[]>([]);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const awaitAllKanji = async () => {
      const response = await fetch('/api/kanji', {
        signal: abortControllerRef.current?.signal,
      }).catch(() => undefined);
      if (!response) return;

      if (!response.ok) {
        toast.warn('При получении кандзи возникла ошибка');
        return;
      }
      const newKanji: Kanji[] = await response.json();
      setAllKanji(newKanji);
    };
    awaitAllKanji();

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
          <div key={kanji.KanjiId} className="flex gap-1">
            <KanjiPreview kanji={kanji} className="grow" />
            <button
              onClick={() => deleteKanji(kanji.KanjiId!)}
              className="w-12 rounded-full pt-1 text-xl leading-3"
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
