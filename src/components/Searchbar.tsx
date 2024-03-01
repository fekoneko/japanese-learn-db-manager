'use client';

import { useId } from 'react';
import { useForm } from 'react-hook-form';

interface SearchbarProps {
  search: (searchValue: string) => any;
}
const Searchbar = ({ search }: SearchbarProps) => {
  const searchbarId = useId();
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit((fieldValues) => search(fieldValues.search))}
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
