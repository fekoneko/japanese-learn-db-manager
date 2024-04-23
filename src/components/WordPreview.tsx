import { Word } from '@/@types/globals';
import { Fragment, HTMLAttributes } from 'react';

interface WordPreviewProps {
  word: Word;
}
const WordPreview = ({
  word,
  ...divAttributes
}: WordPreviewProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...divAttributes}
      className={
        'flex rounded border-[1.5px] border-slate-400 bg-slate-100 ' + divAttributes.className ?? ''
      }
    >
      <div className="m-2 w-[30%] min-w-[8rem] max-w-[10rem] overflow-hidden rounded bg-slate-200 px-3 py-1 md:max-w-[15rem]">
        <h3 className="text-4xl">{word.Word}</h3>
        <p>
          <span className="text-nowrap">{word.Reading}</span>{' '}
          <span className="text-nowrap">
            {word.Reading && word.PitchAccents?.length && `(${word.PitchAccents.join(', ')})`}
          </span>
        </p>
        <p className="break text-slate-500">
          {word.OtherVariants?.length && (
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
      <ol className="grow p-1">
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
