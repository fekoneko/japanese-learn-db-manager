import { FC, useMemo, useState } from 'react';

export interface Sorting {
  column: number;
  accending: boolean;
}

export interface TableProps {
  titles?: string[];
  rows?: (string | number)[][];
  defaultSorting?: Sorting;
}

const Table: FC<TableProps> = ({ titles, rows, defaultSorting }) => {
  const [sorting, setSorting] = useState<Sorting>(defaultSorting ?? { column: 0, accending: true });
  const [filter, setFilter] = useState<string>('');

  const displayedRows = useMemo(() => {
    if (rows === undefined) return null;

    const filteredRows = rows.filter((row) =>
      Object.values(row).some((cell) =>
        cell.toString().trim().toLowerCase().includes(filter.trim().toLowerCase()),
      ),
    );

    return filteredRows.sort((aboveRow, belowRow) => {
      const aboveCell = aboveRow[sorting.column];
      const belowCell = belowRow[sorting.column];
      if (aboveCell === undefined || belowCell === undefined) return 0;

      let comparisonResult =
        typeof aboveCell === 'number' && typeof belowCell === 'number'
          ? aboveCell - belowCell
          : aboveRow[sorting.column]
              .toString()
              .localeCompare(belowRow[sorting.column].toLocaleString());

      return sorting.accending ? comparisonResult : -comparisonResult;
    });
  }, [rows, sorting, filter]);

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()} className="mb-2">
        <input
          type="text"
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          placeholder="Начните ввод, чтобы применить фильтр..."
          className="w-full border-slate-400 bg-transparent"
        />
      </form>

      <table className="border-2 border-slate-400">
        {titles && (
          <thead className="border-b-2 border-slate-400 bg-slate-300 text-slate-600">
            <tr>
              {titles.map((title, index) => (
                <th key={index} className="border border-slate-400 p-0">
                  <button
                    onClick={() =>
                      setSorting((prev) => ({
                        column: index,
                        accending: prev?.column === index ? !prev.accending : true,
                      }))
                    }
                    className="size-full rounded-none border-none"
                  >
                    {title}{' '}
                    <span className="font-mono">
                      {sorting.column === index ? (sorting.accending ? '▲' : '▼') : ' '}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
        )}

        {displayedRows && (
          <tbody>
            {displayedRows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td
                    key={index}
                    className="border border-slate-400 px-2 py-1 text-center align-top"
                  >
                    {typeof cell === 'number' ? cell.toLocaleString('ru') : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
export default Table;
