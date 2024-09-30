'use client';

import { Radical } from '@/types/globals';
import RadicalPreview from '@/components/RadicalPreview';
import { FC, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const RadicalDeletePage: FC = () => {
  const [allRadicals, setAllRadicals] = useState<Radical[]>([]);
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const loadingPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/radicals', {
        signal: abortControllerRef.current?.signal,
      }).catch(() => undefined);

      if (response?.ok) {
        const newRadicals: Radical[] = await response.json();
        setAllRadicals(newRadicals);
        resolve();
      } else reject();
    });

    toast.promise(
      loadingPromise,
      {
        pending: 'Загрузка радикалов...',
        error: 'При загрузке радикалов возникла ошибка',
      },
      { toastId: 0 },
    );

    return () => abortControllerRef.current?.abort('useEffect cleanup');
  }, []);

  const deleteRadical = async (radicalId: number) => {
    const deletePromise = new Promise<void>((resolve, reject) => {
      fetch('/api/radicals?' + new URLSearchParams({ id: radicalId.toString() }), {
        method: 'DELETE',
      }).then((response) => {
        if (response.ok) {
          setAllRadicals((prev) => prev.filter((radical) => radical.RadicalId !== radicalId));
          resolve();
        } else reject();
      });
    });

    const triedRadical = allRadicals.find((radical) => radical.RadicalId === radicalId)?.Character;
    toast.promise(deletePromise, {
      pending: `Удаление радикала "${triedRadical ?? '?'}"...`,
      success: `Радикал "${triedRadical ?? '?'}" удален`,
      error: `При удалении радикала "${triedRadical ?? '?'}" возникла ошибка`,
    });
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      {allRadicals.length ? (
        allRadicals.map((radical) => (
          <div key={radical.RadicalId} className="flex gap-1">
            <RadicalPreview radical={radical} imageDisabled className="grow" />
            <button
              onClick={() => deleteRadical(radical.RadicalId!)}
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
export default RadicalDeletePage;
