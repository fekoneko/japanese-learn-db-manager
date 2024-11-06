'use client';

import { FC, useId } from 'react';
import FormField, { FormFieldInfo } from './FormField';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'title',
    type: 'text',
    label: 'Название',
    options: { required: true, minLength: 1, maxLength: 255 },
  },
  {
    name: 'content',
    type: 'textarea',
    label: 'Содержимое',
    options: { required: true, minLength: 1, maxLength: 10000 },
  },
];

const CustomPostForm: FC = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit, reset } = useForm({});

  const onValid = async (fieldValues: FieldValues) => {
    const responsePromise = new Promise((resolve, reject) =>
      fetch('/api/custom-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldValues),
      })
        .then((response) => {
          if (response.ok) resolve(response);
          else reject();
        })
        .then(() => reset()),
    );

    toast.promise(responsePromise, {
      pending: `Добавление поста...`,
      success: `Пост добавлен`,
      error: `При добавлении поста произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-full min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
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
export default CustomPostForm;
