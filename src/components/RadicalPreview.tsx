import { Radical } from '@/@types/globals';
import { Fragment } from 'react';

interface RadicalPreviewProps {
  radical: Radical;
}
const RadicalPreview = ({ radical }: RadicalPreviewProps) => {
  return (
    <div className="flex items-center rounded border-[1.5px] border-slate-400 bg-slate-200">
      <div className="m-2 flex w-[30%] min-w-[8rem] max-w-[10rem] flex-col items-center justify-center rounded bg-slate-100 px-3 py-1">
        <h3 className="text-4xl">{radical.Character}</h3>
        <p className="text-sm text-slate-500">
          {radical.DictionaryCode && `В словаре: #${radical.DictionaryCode}`}
        </p>
      </div>
      <p className="grow basis-8 p-1 text-center text-lg">{radical.Keyword}</p>
      <p className="grow basis-8 p-1 text-center text-slate-500">
        {radical.OtherVariants?.length && (
          <>
            Другие варианты:{' '}
            {radical.OtherVariants?.map((variant, index) => (
              <Fragment key={index}>
                {index !== 0 && ', '}
                <span className="text-nowrap">{variant}</span>
              </Fragment>
            ))}
          </>
        )}
      </p>
      <p className="w-10 p-1 text-center text-slate-400">{radical.RadicalId}</p>
    </div>
  );
};
export default RadicalPreview;
