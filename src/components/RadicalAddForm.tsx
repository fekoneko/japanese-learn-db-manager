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
    name: 'CorrespondingKanjiId',
    type: 'number',
    label: 'CorrespondingKanjiId',
    options: { min: 1, max: 2147483648 },
  },
  {
    name: 'Keyword',
    type: 'text',
    label: 'Keyword',
    options: { minLength: 1, maxLength: 255 },
  },
  {
    name: 'DictionaryCode',
    type: 'number',
    label: 'DictionaryCode',
    options: { min: 1, max: 214 },
  },
  {
    name: 'OtherVariants',
    type: 'text',
    label: 'OtherVariants',
    options: { minLength: 1, maxLength: 1 },
  },
];

const RadicalAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit } = useForm();

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
    );

    toast.promise(responsePromise, {
      pending: `Добавление радикала "${newRadical.Character}"...`,
      success: `Радикал "${newRadical.Character}" добавлен`,
      error: `При добавлении радикала "${newRadical.Character}" произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-3 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header">Добавить радикал</h1>
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
export default RadicalAddForm;
