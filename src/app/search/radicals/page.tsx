'use client';

import { Radical } from '@/@types/globals';
import Searchbar, {
  SearchField,
  GetSearchFieldOptionsFunction,
  SearchFunction,
} from '@/components/Searchbar';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import RadicalPreview from '@/components/RadicalPreview';
import DbContext from '@/contexts/DbContext';

const searchFields: SearchField<'c' | 'm' | 'k' | 'd'>[] = [
  { name: 'c', label: 'Радикал' },
  { name: 'm', label: 'Название' },
  { name: 'k', label: 'Соответствующий кандзи' },
  { name: 'd', label: 'Код в словаре' },
];

const RadicalsSearchPage = () => {
  const [searchResults, setSearchResults] = useState<Radical[]>([]);
  const { db } = useContext(DbContext);

  const search: SearchFunction<'c' | 'm' | 'k' | 'd'> = async (searchValue: any, abortSignal) => {
    const searchPromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch(`/api/${db}/radicals?` + new URLSearchParams(searchValue), {
        signal: abortSignal,
      });

      if (response.ok) {
        const newSearchResults: Radical[] = await response.json();
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

  const getFieldOptions: GetSearchFieldOptionsFunction<'c' | 'm' | 'k' | 'd'> = async (
    searchValue: any,
    fieldName,
    abortSignal,
  ) => {
    const response = await fetch(`/api/${db}/radicals?` + new URLSearchParams(searchValue), {
      signal: abortSignal,
    });
    if (!response.ok) {
      toast.warn('При поиске радикалов возникла ошибка');
      return [];
    }
    const newSearchResults: Radical[] = await response.json();
    return newSearchResults.flatMap((radical) =>
      fieldName === 'c'
        ? radical.Character
        : fieldName === 'm'
          ? radical.Keyword
          : fieldName === 'd'
            ? radical.DictionaryCode?.toString() ?? []
            : radical.CorrespondingKanjiCharacter ?? [],
    );
  };

  return (
    <div className="flex min-h-full min-w-full flex-col gap-3 px-[15%] py-4">
      <Searchbar search={search} fields={searchFields} getFieldOptions={getFieldOptions} />
      {searchResults.length ? (
        searchResults.map((result) => <RadicalPreview key={result.RadicalId} radical={result} />)
      ) : (
        <h3 className="text-center text-2xl">Ничего не найдено</h3>
      )}
    </div>
  );
};
export default RadicalsSearchPage;
