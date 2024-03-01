'use client';

import { useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormField, { FormFieldInfo } from './FormField';
import { toast } from 'react-toastify';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'Character',
    type: 'text',
    label: 'Символ',
    options: { required: true, minLength: 1, maxLength: 1 },
  },
  {
    name: 'CorrespondingKanjiId',
    type: 'select',
    label: 'Соответствующий кандзи',
    getOptions: async (searchValue?: string) => {
      if (!searchValue) return [];
      const response = await fetch('/api/kanji?' + new URLSearchParams({ s: searchValue }));
      if (!response.ok) return [];
      const responseBody = await response.json();
      return (
        responseBody?.map((kanji: any) => ({
          value: kanji?.KanjiId?.toString(),
          label: kanji?.Character,
        })) ?? []
      );
    },
  },
  {
    name: 'Keyword',
    type: 'text',
    label: 'Название',
    options: { required: true, minLength: 1, maxLength: 255 },
  },
  {
    name: 'DictionaryCode',
    type: 'number',
    label: 'Код в словаре',
    options: { required: true, min: 1, max: 214 },
  },
  {
    name: 'OtherVariants',
    type: 'text',
    label: 'Другие варианты',
    array: true,
    options: { minLength: 1, maxLength: 1 },
  },
];

const RadicalAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit, reset } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    console.log(fieldValues);

    const newRadical: any = {};
    newRadical.Character = fieldValues.Character;
    if (fieldValues.CorrespondingKanjiId?.length)
      newRadical.CorrespondingKanjiId = +fieldValues.CorrespondingKanjiId;
    if (fieldValues.Keyword?.length) newRadical.Keyword = fieldValues.Keyword;
    if (fieldValues.DictionaryCode?.length) newRadical.DictionaryCode = +fieldValues.DictionaryCode;
    if (fieldValues.OtherVariants?.length)
      newRadical.OtherVariants = fieldValues.OtherVariants?.filter(
        (value: string) => !!value?.length,
      );

    const responsePromise = new Promise((resolve, reject) =>
      fetch('/api/radicals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRadical),
      }).then((response) => {
        if (response.ok) resolve(response);
        else reject();
      }),
    ).then(() => reset());

    toast.promise(responsePromise, {
      pending: `Добавление радикала "${newRadical.Character}"...`,
      success: `Радикал "${newRadical.Character}" добавлен`,
      error: `При добавлении радикала "${newRadical.Character}" произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header mb-5">Добавить радикал</h1>
      {formFieldsInfo.map((fieldInfo, index) => (
        <FormField
          key={index}
          register={register}
          control={control}
          formId={formId}
          fieldInfo={fieldInfo}
          formState={formState}
        />
      ))}

      <button className="col-span-2" type="submit">
        Добавить
      </button>
    </form>
  );
};
export default RadicalAddForm;
