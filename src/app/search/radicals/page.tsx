'use client';

import { Radical } from '@/@types/globals';
import Searchbar, { SearchField, SearchFunction } from '@/components/Searchbar';
import { useState } from 'react';
import { toast } from 'react-toastify';
import RadicalPreview from '@/components/RadicalPreview';

const searchFields: SearchField<'c' | 'm' | 'k' | 'd'>[] = [
  { name: 'c', label: 'Радикал' },
  { name: 'm', label: 'Название' },
  { name: 'k', label: 'Соответствующий кандзи' },
  { name: 'd', label: 'Код в словаре' },
];

const RadicalsSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Radical[]>([]);

  const search: SearchFunction = async (searchValue, abortSignal) => {
    const searchParams = typeof searchValue === 'object' ? searchValue : { s: searchValue };
    const response = await fetch('/api/radicals?' + new URLSearchParams(searchParams), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске радикалов возникла ошибка');
      return;
    }
    const newSearchResults = await response.json();
    setSearchResults(newSearchResults);
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      <Searchbar search={search} fields={searchFields} />
      {searchResults.length ? (
        searchResults.map((result) => <RadicalPreview key={result.RadicalId} radical={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default RadicalsSearchPage;
