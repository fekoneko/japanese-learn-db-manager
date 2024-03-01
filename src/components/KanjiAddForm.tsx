'use client';

import { useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormField, { FormFieldInfo } from './FormField';
import { toast } from 'react-toastify';
import { Kanji, Radical } from '@/@types/globals';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'Character',
    type: 'text',
    label: 'Символ',
    options: { required: true, minLength: 1, maxLength: 1 },
  },
  {
    name: 'Onyomi',
    type: 'text',
    label: 'Оны',
    array: true,
    options: { minLength: 1, maxLength: 10 },
  },
  {
    name: 'Kunyomi',
    type: 'text',
    label: 'Куны',
    array: true,
    options: { minLength: 1, maxLength: 10 },
  },
  {
    name: 'Meaning',
    type: 'text',
    label: 'Значение',
    options: { minLength: 1, maxLength: 255 },
  },
  {
    name: 'Popularity',
    type: 'number',
    label: 'Место в топе',
    options: { min: 1, max: 2147483648 },
  },
  {
    name: 'RadicalIds',
    type: 'select',
    label: 'Радикалы',
    array: true,
    getOptions: async (searchValue?: string) => {
      if (!searchValue) return [];
      const response = await fetch('/api/radicals?' + new URLSearchParams({ s: searchValue }));
      if (!response.ok) {
        toast.warn('Ошибка загрузки радикалов');
        return [];
      }
      const responseBody: Radical[] = await response.json();
      return (
        responseBody?.map((radical) => ({
          value: radical?.RadicalId?.toString(),
          label: radical?.Character,
        })) ?? []
      );
    },
  },
];

const KanjiAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit, reset } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    const newKanji: Partial<Kanji> = {};
    newKanji.Character = fieldValues.Character;
    if (fieldValues.Onyomi?.length)
      newKanji.Onyomi = fieldValues.Onyomi?.filter((value: string) => !!value?.length);
    if (fieldValues.Kunyomi?.length)
      newKanji.Kunyomi = fieldValues.Kunyomi?.filter((value: string) => !!value?.length);
    if (fieldValues.Meaning?.length) newKanji.Meaning = fieldValues.Meaning;
    if (fieldValues.Popularity?.length) newKanji.Popularity = +fieldValues.Popularity;
    if (fieldValues.RadicalIds?.length)
      newKanji.RadicalIds = fieldValues.RadicalIds?.map((value: string) =>
        value === '' ? NaN : +value,
      )?.filter((value: number) => !isNaN(value));

    const responsePromise = new Promise((resolve, reject) =>
      fetch('/api/kanji', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newKanji),
      }).then((response) => {
        if (response.ok) resolve(response);
        else reject();
      }),
    ).then(() => reset());

    toast.promise(responsePromise, {
      pending: `Добавление кандзи "${newKanji.Character}"...`,
      success: `Кандзи "${newKanji.Character}" добавлен`,
      error: `При добавлении кандзи "${newKanji.Character}" произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header mb-5">Добавить кандзи</h1>
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
export default KanjiAddForm;
