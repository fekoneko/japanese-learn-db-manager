'use client';

import { Word } from '@/@types/globals';
import WordPreview from '@/components/WordPreview';
import Searchbar, { SearchField, SearchFunction } from '@/components/Searchbar';
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

  const search: SearchFunction = async (searchValue, abortSignal) => {
    const searchParams = typeof searchValue === 'object' ? searchValue : { s: searchValue };
    const response = await fetch('/api/words?' + new URLSearchParams(searchParams), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске слов возникла ошибка');
      return;
    }
    const newSearchResults = await response.json();
    setSearchResults(newSearchResults);
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      <Searchbar search={search} fields={searchFields} />
      {searchResults.length ? (
        searchResults.map((result) => <WordPreview key={result.WordId} word={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default WordSearchPage;
