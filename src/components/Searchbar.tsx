'use client';

import { useId, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface SearchbarProps {
  search: (searchValue: string, abortSignal?: AbortSignal) => any;
}
const Searchbar = ({ search }: SearchbarProps) => {
  const searchbarId = useId();
  const { register, handleSubmit } = useForm();
  const abortControllerRef = useRef<AbortController>();

  return (
    <form
      onSubmit={handleSubmit((fieldValues) => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();
        search(fieldValues.search, abortControllerRef.current?.signal);
      })}
      className="flex gap-2"
    >
      <input
        id={searchbarId}
        {...register('search')}
        type="search"
        role="search"
        autoFocus
        autoComplete="off"
        className="grow border-slate-400 bg-slate-300 pl-4"
      />
      <button type="submit" className="border-slate-400">
        Поиск
      </button>
    </form>
  );
};
export default Searchbar;
