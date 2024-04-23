import { Radical } from '@/@types/globals';
import { Fragment, HTMLAttributes } from 'react';

interface RadicalPreviewProps {
  radical: Radical;
}
const RadicalPreview = ({
  radical,
  ...divAttributes
}: RadicalPreviewProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...divAttributes}
      className={
        'flex overflow-hidden rounded border-[1.5px] border-slate-400 bg-slate-200 ' +
          divAttributes.className ?? ''
      }
    >
      <div className="relative m-2 flex w-[30%] min-w-[8rem] max-w-[10rem] flex-col items-center justify-center rounded bg-slate-100 px-3 py-1">
        <h3 className="text-4xl">{radical.Character}</h3>
        <p className="text-sm text-slate-500">
          {radical.DictionaryCode && `В словаре: #${radical.DictionaryCode}`}
        </p>

        <div
          dangerouslySetInnerHTML={{ __html: radical.Image ?? 'нет изображения' }}
          className="pointer-events-none absolute left-[calc(100%+0.5rem)] z-40 flex size-64 items-center justify-center rounded-lg bg-white p-4 text-lg opacity-0 shadow-xl transition-opacity [:hover>&]:opacity-100"
        />
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
