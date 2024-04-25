import { Word } from '@/@types/globals';
import { useMemo } from 'react';

export interface WordReadingProps {
  reading: string;
  pitchAccents?: number[];
}
const WordReading = ({ reading, pitchAccents }: WordReadingProps) => {
  return (
    <div>
      {pitchAccents ? (
        pitchAccents.map((accent, index) => (
          <p key={index} className="flex text-nowrap">
            {accent !== 1 && <span>{reading[0]}</span>}
            <span className="border-t-[1.5px] border-red-500">
              {accent === 0
                ? reading.substring(1)
                : accent === 1
                  ? reading[0]
                  : reading.substring(1, accent)}
            </span>
            {accent !== 0 && reading.length > accent && (
              <>
                <span className="h-2 self-start border-l-[1.5px] border-red-500"></span>
                <span>{reading.substring(accent)}</span>
              </>
            )}
          </p>
        ))
      ) : (
        <p>
          <span>{reading}</span>
        </p>
      )}
    </div>
  );
};
export default WordReading;
