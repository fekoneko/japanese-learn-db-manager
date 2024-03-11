'use client';

import { Word } from '@/@types/globals';
import WordPreview from '@/components/WordPreview';
import Searchbar from '@/components/Searchbar';
import { useState } from 'react';
import { toast } from 'react-toastify';

const WordSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Word[]>([]);

  const search = async (searchValue: string, abortSignal?: AbortSignal) => {
    const response = await fetch('/api/words?' + new URLSearchParams({ s: searchValue }), {
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
      <Searchbar search={search} />
      {searchResults.length ? (
        searchResults.map((result) => <WordPreview key={result.WordId} word={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default WordSearchPage;
