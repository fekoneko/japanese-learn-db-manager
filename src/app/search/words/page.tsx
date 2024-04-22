'use client';

import { Word } from '@/@types/globals';
import WordPreview from '@/components/WordPreview';
import Searchbar, {
  SearchField,
  GetSearchFieldOptionsFunction,
  SearchFunction,
} from '@/components/Searchbar';
import { useState } from 'react';
import { toast } from 'react-toastify';

const searchFields: SearchField<'w' | 'r' | 'm' | 'k'>[] = [
  { name: 'w', label: 'Слово' },
  { name: 'r', label: 'Чтение' },
  { name: 'm', label: 'Значение' },
  { name: 'k', label: 'Кандзи' },
];

const WordSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Word[]>([]);

  const search: SearchFunction<'w' | 'r' | 'm' | 'k'> = async (searchValue: any, abortSignal) => {
    const response = await fetch('/api/words?' + new URLSearchParams(searchValue), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске слов возникла ошибка');
      return [];
    }
    const newSearchResults: Word[] = await response.json();
    setSearchResults(newSearchResults);
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
