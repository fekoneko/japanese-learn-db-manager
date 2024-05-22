'use client';

import { useContext, useId, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormField, { FormFieldInfo } from './FormField';
import { toast } from 'react-toastify';
import { Word } from '@/@types/globals';
import DbContext from '@/contexts/DbContext';

const WordAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit, reset } = useForm();
  const { db } = useContext(DbContext);

  const formFieldsInfo: FormFieldInfo[] = useMemo(
    () => [
      {
        name: 'Word',
        type: 'text',
        label: 'Слово',
        options: { required: true, minLength: 1, maxLength: 30 },
      },
      {
        name: 'Reading',
        type: 'text',
        label: 'Чтение',
        options: { required: true, minLength: 1, maxLength: 30 },
      },
      {
        name: 'PitchAccents',
        type: 'number',
        label: 'Тип акцента',
        array: true,
        options: { min: 0, max: 30 },
      },
      {
        name: 'Meanings',
        type: 'text',
        label: 'Значения',
        array: true,
        options: { minLength: 1, maxLength: 30 },
      },
      {
        name: 'Popularity',
        type: 'number',
        label: 'Место в топе',
        options: { min: 1, max: 2147483648 },
      },
      {
        name: 'OtherVariants',
        type: 'text',
        label: 'Другие написания',
        array: true,
        options: { minLength: 1, maxLength: 30 },
      },
      {
        name: 'KanjiIds',
        type: 'select',
        label: 'Кандзи',
        array: true,
        getOptions: async (searchValue?: string, abortSignal?: AbortSignal) => {
          const response = await fetch(
            `/api/${db}/kanji?` + new URLSearchParams({ s: searchValue ?? '' }),
            {
              signal: abortSignal,
            },
          );
          if (!response.ok) {
            toast.warn('Ошибка загрузки кандзи');
            return [];
          }
          const responseBody = await response.json();
          return (
            responseBody?.map((kanji: any) => ({
              value: kanji?.KanjiId?.toString(),
              label: kanji?.Character,
            })) ?? []
          );
        },
      },
    ],
    [db],
  );

  const onValid = async (fieldValues: FieldValues) => {
    const newWord: Partial<Word> = {};
    newWord.Word = fieldValues.Word;
    newWord.Reading = fieldValues.Reading;
    if (fieldValues.PitchAccents?.length)
      newWord.PitchAccents = fieldValues.PitchAccents?.map((value: string) =>
        value === '' ? NaN : +value,
      )?.filter((value: number) => !isNaN(value));
    if (fieldValues.Meanings?.length)
      newWord.Meanings = fieldValues.Meanings?.filter((value: string) => !!value?.length);
    if (fieldValues.Popularity?.length) newWord.Popularity = +fieldValues.Popularity;
    if (fieldValues.OtherVariants?.length)
      newWord.OtherVariants = fieldValues.OtherVariants?.filter((value: string) => !!value?.length);
    if (fieldValues.KanjiIds?.length)
      newWord.KanjiIds = fieldValues.KanjiIds?.map((value: string) =>
        value === '' ? NaN : +value,
      )?.filter((value: number) => !isNaN(value));

    const responsePromise = new Promise((resolve, reject) =>
      fetch(`/api/${db}/words`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWord),
      }).then((response) => {
        if (response.ok) resolve(response);
        else reject();
      }),
    ).then(() => reset());

    toast.promise(responsePromise, {
      pending: `Добавление слова "${newWord.Word}"...`,
      success: `Слово "${newWord.Word}" добавлено`,
      error: `При добавлении слова "${newWord.Word}" произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header mb-5">Добавить слово</h1>
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
export default WordAddForm;
