'use client';

import { Word } from '@/types/globals';
import WordPreview from '@/components/WordPreview';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Удаление слов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const WordDeletePage: FC = () => {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const loadingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/words', {
        signal: abortControllerRef.current?.signal,
      }).catch(() => undefined);

      if (response?.ok) {
        const newWords: Word[] = await response.json();
        setAllWords(newWords);
        resolve();
      } else reject();
    });

    toast.promise(
      loadingPromise,
      {
        pending: 'Загрузка слов...',
        error: 'При загрузке слов возникла ошибка',
      },
      { toastId: 0 },
    );

    return () => abortControllerRef.current?.abort('useEffect cleanup');
  }, []);

  const deleteWord = async (wordId: number) => {
    const deletePromise = new Promise<void>((resolve, reject) => {
      fetch('/api/words?' + new URLSearchParams({ id: wordId.toString() }), {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          setAllWords((prev) => prev.filter((word) => word.WordId !== wordId));
          resolve();
        } else reject();
      });
    });

    const triedWord = allWords.find((word) => word.WordId === wordId)?.Word;
    toast.promise(deletePromise, {
      pending: `Удаление слова "${triedWord ?? '?'}"...`,
      success: `Слово "${triedWord ?? '?'}" удалено`,
      error: `При удалении слова "${triedWord ?? '?'}" возникла ошибка`,
    });
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      {allWords.length ? (
        allWords.map((word) => (
          <div key={word.WordId} className="flex gap-1">
            <WordPreview word={word} className="grow" />
            <button
              onClick={() => deleteWord(word.WordId!)}
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
export default WordDeletePage;
