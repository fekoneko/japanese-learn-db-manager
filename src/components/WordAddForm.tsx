'use client';

import { FormField } from '@/@types/globals';
import { useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const formFields: FormField[] = [
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
    options: { min: 1, max: 30 },
  },
  {
    name: 'Meanings',
    type: 'text',
    label: 'Meanings',
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
    options: { minLength: 1, maxLength: 30 },
  },
];

const WordAddForm = () => {
  const formId = useId();
  const { register, handleSubmit } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    const newWord: any = {};
    newWord.Word = fieldValues.Word;
    newWord.Reading = fieldValues.Reading;
    newWord.PitchAccents = [fieldValues.PitchAccents];
    newWord.Meanings = [fieldValues.Meanings];
    newWord.Popularity = +fieldValues.Popularity;
    newWord.OtherVariants = [fieldValues.OtherVariants];

    console.log(
      await fetch('/api/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWord),
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onValid)} className="shadow-lg bg-white p-3 flex flex-col gap-3">
      {formFields.map((field, index) => (
        <fieldset key={index} className="grid grid-cols-[1fr_2fr] gap-3">
          <label htmlFor={formId + field.name}>
            {field.label}
            {field.options?.required && <span className="text-red-500 font-bold">*</span>}:
          </label>
          <input
            type={field.type}
            id={formId + field.name}
            {...register(field.name, field.options)}
            className="border"
          />
        </fieldset>
      ))}

      <button className="col-span-2 border" type="submit">
        Submit
      </button>
    </form>
  );
};
export default WordAddForm;
