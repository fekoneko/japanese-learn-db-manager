'use client';

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

export type Db = 'postgres' | 'mysql';

interface DbContextValue {
  db: Db;
  setDb: Dispatch<SetStateAction<Db>>;
}

const DbContext = createContext({} as DbContextValue);

export const DbProvider = ({ children }: PropsWithChildren) => {
  const [db, setDb] = useState<Db>('postgres');

  return <DbContext.Provider value={{ db, setDb }}>{children}</DbContext.Provider>;
};

export default DbContext;
