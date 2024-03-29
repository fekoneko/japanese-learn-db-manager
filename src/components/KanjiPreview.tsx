import { Kanji } from '@/@types/globals';
import { Fragment } from 'react';

interface KanjiPreviewProps {
  kanji: Kanji;
}
const KanjiPreview = ({ kanji }: KanjiPreviewProps) => {
  return (
    <div className="flex items-center rounded border-[1.5px] border-slate-400 bg-slate-200">
      <div className="m-2 flex w-[30%] min-w-[8rem] max-w-[10rem] flex-col items-center justify-center rounded bg-slate-100 px-3 py-1">
        <h3 className="text-4xl">{kanji.Character}</h3>
        <p className="text-sm text-slate-500">
          {kanji.Popularity && `В топе: #${kanji.Popularity}`}
        </p>
      </div>
      <p className="grow basis-8 p-1 text-center text-lg">{kanji.Meaning}</p>
      <p className="grow basis-8 p-1 text-center">
        {kanji.Onyomi?.map((reading, index) => (
          <Fragment key={index}>
            {index !== 0 && ', '}
            <span className="text-nowrap">{reading}</span>
          </Fragment>
        ))}
      </p>
      <p className="grow basis-8 p-1 text-center">
        {kanji.Kunyomi?.map((reading, index) => (
          <Fragment key={index}>
            {index !== 0 && ', '}
            <span className="text-nowrap">{reading}</span>
          </Fragment>
        ))}
      </p>
      <p className="w-10 p-1 text-center text-slate-400">{kanji.KanjiId}</p>
    </div>
  );
};
export default KanjiPreview;
