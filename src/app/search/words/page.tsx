'use client';

import { Word } from '@/types/globals';
import WordPreview from '@/components/WordPreview';
import Searchbar, {
  SearchField,
  GetSearchFieldOptionsFunction,
  SearchFunction,
} from '@/components/Searchbar';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Поиск слов - JapaneseLearn DB',
  description: 'JapaneseLearn DB / Японский - просто',
};

const searchFields: SearchField<'w' | 'r' | 'm' | 'k'>[] = [
  { name: 'w', label: 'Слово' },
  { name: 'r', label: 'Чтение' },
  { name: 'm', label: 'Значение' },
  { name: 'k', label: 'Кандзи' },
];

const WordSearchPage: FC = () => {
  const [searchResults, setSearchResults] = useState<Word[]>([]);

  const search: SearchFunction<'w' | 'r' | 'm' | 'k'> = async (searchValue: any, abortSignal) => {
    const searchPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch('/api/words?' + new URLSearchParams(searchValue), {
        signal: abortSignal,
      });

      if (response.ok) {
        const newSearchResults: Word[] = await response.json();
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

  const getFieldOptions: GetSearchFieldOptionsFunction<'w' | 'r' | 'm' | 'k'> = async (
    searchValue: any,
    fieldName,
    abortSignal,
  ) => {
    const response = await fetch('/api/words?' + new URLSearchParams(searchValue), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске слов возникла ошибка');
      return [];
    }
    const newSearchResults: Word[] = await response.json();
    return newSearchResults.flatMap((word) =>
      fieldName === 'w'
        ? word.Word
        : fieldName === 'r'
          ? word.Reading
          : fieldName === 'm'
            ? word.Meanings ?? []
            : word.KanjiCharacters ?? [],
    );
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      <Searchbar search={search} fields={searchFields} getFieldOptions={getFieldOptions} />
      {searchResults.length ? (
        searchResults.map((result) => <WordPreview key={result.WordId} word={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default WordSearchPage;
