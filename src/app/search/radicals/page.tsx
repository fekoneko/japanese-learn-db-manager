'use client';

import { Radical } from '@/@types/globals';
import Searchbar from '@/components/Searchbar';
import { useState } from 'react';
import { toast } from 'react-toastify';
import RadicalPreview from '@/components/RadicalPreview';

const RadicalsSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Radical[]>([]);

  const search = async (searchValue: string, abortSignal?: AbortSignal) => {
    const response = await fetch('/api/radicals?' + new URLSearchParams({ s: searchValue }), {
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
      <Searchbar search={search} />
      {searchResults.length ? (
        searchResults.map((result) => <RadicalPreview key={result.RadicalId} radical={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default RadicalsSearchPage;
