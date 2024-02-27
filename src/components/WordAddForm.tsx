'use client';

import { FormField } from '@/@types/globals';
import { useId } from 'react';
import { useForm } from 'react-hook-form';

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
    name: 'Pitches',
    type: 'number',
    label: 'PitchAccents',
    options: { min: 1, max: 30 },
  },
  {
    name: 'Meaings',
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

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="shadow-lg bg-white p-3 flex flex-col gap-3"
    >
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
