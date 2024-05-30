'use client';

import DbContext from '@/contexts/DbContext';
import { useContext } from 'react';

const DbSwitch = () => {
  const { db, setDb } = useContext(DbContext);

  return (
    <div className="relative grid h-10 w-64 grid-cols-2 gap-2 rounded-full border-2 border-white/50 p-1">
      <button
        onClick={() => setDb('postgres')}
        className={
          'rounded-full border-none p-0 leading-3 hover:bg-white/20 ' +
          (db === 'postgres' ? 'pointer-events-none bg-white/20' : '')
        }
        tabIndex={db === 'postgres' ? -1 : undefined}
      >
        PostgreSQL
      </button>
      <button
        onClick={() => setDb('mysql')}
        className={
          'rounded-full border-none p-0 leading-3 hover:bg-white/20 ' +
          (db === 'mysql' ? 'pointer-events-none bg-white/20' : '')
        }
        tabIndex={db === 'mysql' ? -1 : undefined}
      >
        MySQL
      </button>
      <div
        className={
          'pointer-events-none absolute left-0 top-0 h-full w-1/2 rounded-full border-2 border-white transition-transform duration-500 ' +
          (db === 'postgres' ? 'translate-x-0' : 'translate-x-full')
        }
      />
    </div>
  );
};
export default DbSwitch;
