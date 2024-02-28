'use client';

import { FormFieldInfo } from '@/@types/globals';
import { useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ArrayInput from './ArrayInput';
import Input from './Input';
import { toast } from 'react-toastify';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'Character',
    type: 'text',
    label: 'Character',
    options: { required: true, minLength: 1, maxLength: 1 },
  },
  {
    name: 'Onyomi',
    type: 'text',
    label: 'Onyomi',
    array: true,
    options: { minLength: 1, maxLength: 10 },
  },
  {
    name: 'Kunyomi',
    type: 'text',
    label: 'Kunyomi',
    array: true,
    options: { minLength: 1, maxLength: 10 },
  },
  {
    name: 'Meaning',
    type: 'text',
    label: 'Meaning',
    options: { minLength: 1, maxLength: 255 },
  },
  {
    name: 'Popularity',
    type: 'number',
    label: 'Popularity',
    options: { min: 1, max: 2147483648 },
  },
];

const KanjiAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit, reset } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    console.log(fieldValues);

    const newKanji: any = {};
    newKanji.Character = fieldValues.Character;
    if (fieldValues.Onyomi?.length)
      newKanji.Onyomi = fieldValues.Onyomi?.filter((value: string) => !!value?.length);
    if (fieldValues.Kunyomi?.length)
      newKanji.Kunyomi = fieldValues.Kunyomi?.filter((value: string) => !!value?.length);
    if (fieldValues.Meaning?.length) newKanji.Meaning = fieldValues.Meaning;
    if (fieldValues.Popularity?.length) newKanji.Popularity = +fieldValues.Popularity;

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
      className="flex w-1/2 min-w-max flex-col gap-3 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header">Добавить кандзи</h1>
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
export default KanjiAddForm;
