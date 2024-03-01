import { Word } from '@/@types/globals';
import { Fragment } from 'react';

interface ItemPreviewProps {
  word: Word;
}
const WordPreview = ({ word }: ItemPreviewProps) => {
  return (
    <div className="flex rounded border-[1.5px] border-slate-400 bg-slate-200">
      <div className="m-2 w-[30%] max-w-[minmax(15rem,min-content)] rounded bg-slate-100 px-3 py-1">
        <h3 className="text-4xl">{word.Word}</h3>
        <p>
          <span className="text-nowrap">{word.Reading}</span>{' '}
          <span className="text-nowrap">
            {word.Reading && word.PitchAccents?.length && `(${word.PitchAccents.join(', ')})`}
          </span>
        </p>
        <p className="break text-slate-500">
          {word.OtherVariants && (
            <>
              Иначе:{' '}
              {word.OtherVariants?.map((variant, index) => (
                <Fragment key={index}>
                  {index !== 0 && ', '}
                  <span className="text-nowrap">{variant}</span>
                </Fragment>
              ))}
            </>
          )}
        </p>
        <p className="text-slate-500">{word.Popularity && `В топе: #${word.Popularity}`}</p>
      </div>
      <ol className="grow bg-slate-200 p-1">
        {word.Meanings &&
          word.Meanings.map((meaning, index) => (
            <li key={index} className="list-item list-inside list-decimal">
              {meaning}
            </li>
          ))}
      </ol>
      <p className="w-10 p-1 text-center text-slate-400">{word.WordId}</p>
    </div>
  );
};
export default WordPreview;
