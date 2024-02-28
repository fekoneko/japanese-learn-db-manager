'use client';

import { FormFieldInfo } from '@/@types/globals';
import { useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ArrayInput from './ArrayInput';
import Input from './Input';
import { toast } from 'react-toastify';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'Word',
    type: 'text',
    label: 'Word',
    options: { required: true, minLength: 1, maxLength: 30 },
  },
  {
    name: 'Reading',
    type: 'text',
    label: 'Reading',
    options: { required: true, minLength: 1, maxLength: 30 },
  },
  {
    name: 'PitchAccents',
    type: 'number',
    label: 'PitchAccents',
    array: true,
    options: { min: 1, max: 30 },
  },
  {
    name: 'Meanings',
    type: 'text',
    label: 'Meanings',
    array: true,
    options: { minLength: 1, maxLength: 30 },
  },
  {
    name: 'Popularity',
    type: 'number',
    label: 'Popularity',
    options: { min: 1, max: 2147483648 },
  },
  {
    name: 'OtherVariants',
    type: 'text',
    label: 'OtherVarints',
    array: true,
    options: { minLength: 1, maxLength: 30 },
  },
];

const WordAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit, reset } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    console.log(fieldValues);

    const newWord: any = {};
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

    const responsePromise = new Promise((resolve, reject) =>
      fetch('/api/words', {
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
      className="flex w-1/2 min-w-max flex-col gap-3 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header">Добавить слово</h1>
      {formFieldsInfo.map((fieldInfo, index) =>
        fieldInfo.array ? (
          <ArrayInput
            key={index}
            register={register}
            control={control}
            formId={formId}
            fieldInfo={fieldInfo}
            formState={formState}
          />
        ) : (
          <Input
            key={index}
            register={register}
            formId={formId}
            fieldInfo={fieldInfo}
            formState={formState}
          />
        ),
      )}

      <button className="col-span-2" type="submit">
        Добавить
      </button>
    </form>
  );
};
export default WordAddForm;
