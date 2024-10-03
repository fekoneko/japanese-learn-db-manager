'use client';

import { Kanji } from '@/types/globals';
import Searchbar, {
  SearchField,
  GetSearchFieldOptionsFunction,
  SearchFunction,
} from '@/components/Searchbar';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import KanjiPreview from '@/components/KanjiPreview';

const searchFields: SearchField<'c' | 'o' | 'k' | 'm' | 'r'>[] = [
  { name: 'c', label: 'Кандзи' },
  { name: 'o', label: 'Онное чтение' },
  { name: 'k', label: 'Кунное чтение' },
  { name: 'm', label: 'Значение' },
  { name: 'r', label: 'Радикал' },
];

const KanjiSearchPage: FC = () => {
  const [searchResults, setSearchResults] = useState<Kanji[]>([]);

  const search: SearchFunction<'c' | 'o' | 'k' | 'm' | 'r'> = async (
    searchValue: any,
    abortSignal,
  ) => {
    const searchPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/kanji?' + new URLSearchParams(searchValue), {
        signal: abortSignal,
      });

      if (response.ok) {
        const newSearchResults: Kanji[] = await response.json();
        setSearchResults(newSearchResults);
        resolve();
      } else reject();
    });

    toast.promise(
      searchPromise,
      {
        pending: 'Идёт поиск...',
        error: 'При поиске возникла ошибка',
      },
      { toastId: 0 },
    );
  };

  const getFieldOptions: GetSearchFieldOptionsFunction<'c' | 'o' | 'k' | 'm' | 'r'> = async (
    searchValue: any,
    fieldName,
    abortSignal,
  ) => {
    const response = await fetch('/api/kanji?' + new URLSearchParams(searchValue), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске кандзи возникла ошибка');
      return [];
    }
    const newSearchResults: Kanji[] = await response.json();
    return newSearchResults.flatMap((kanji) =>
      fieldName === 'c'
        ? kanji.Character
        : fieldName === 'o'
          ? kanji.Onyomi ?? []
          : fieldName === 'k'
            ? kanji.Kunyomi ?? []
            : fieldName === 'm'
              ? kanji.Meaning ?? []
              : kanji.RadicalCharacters ?? [],
    );
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      <Searchbar search={search} fields={searchFields} getFieldOptions={getFieldOptions} />
      {searchResults.length ? (
        searchResults.map((result) => <KanjiPreview key={result.KanjiId} kanji={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default KanjiSearchPage;
