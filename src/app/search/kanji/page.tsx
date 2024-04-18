'use client';

import { Kanji } from '@/@types/globals';
import Searchbar, { SearchField, SearchFunction } from '@/components/Searchbar';
import { useState } from 'react';
import { toast } from 'react-toastify';
import KanjiPreview from '@/components/KanjiPreview';

const searchFields: SearchField<'c' | 'o' | 'k' | 'm' | 'r'>[] = [
  { name: 'c', label: 'Кандзи' },
  { name: 'o', label: 'Онное чтение' },
  { name: 'k', label: 'Кунное чтение' },
  { name: 'm', label: 'Значение' },
  { name: 'r', label: 'Радикал' },
];

const KanjiSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Kanji[]>([]);

  const search: SearchFunction = async (searchValue, abortSignal) => {
    const searchParams = typeof searchValue === 'object' ? searchValue : { s: searchValue };
    const response = await fetch('/api/kanji?' + new URLSearchParams(searchParams), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске кандзи возникла ошибка');
      return;
    }
    const newSearchResults = await response.json();
    setSearchResults(newSearchResults);
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      <Searchbar search={search} fields={searchFields} />
      {searchResults.length ? (
        searchResults.map((result) => <KanjiPreview key={result.KanjiId} kanji={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default KanjiSearchPage;
