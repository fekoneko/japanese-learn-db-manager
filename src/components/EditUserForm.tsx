'use client';

import { FC, useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormField, { FormFieldInfo } from './FormField';
import { toast } from 'react-toastify';
import { User } from 'next-auth';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Эл. почта',
    options: { required: true, minLength: 5, maxLength: 2083 },
  },
  {
    name: 'name',
    type: 'text',
    label: 'Имя',
    options: { required: false, minLength: 1, maxLength: 32 },
  },
  {
    name: 'image',
    type: 'text',
    label: 'URL аватара',
    options: { required: false, minLength: 1, maxLength: 2083 },
  },
  {
    name: 'password',
    type: 'password',
    label: 'Изменить пароль',
    options: { required: false, minLength: 8, maxLength: 256 },
  },
];

export interface EditUserFormProps {
  currentUser: User;
  onEditUser: (payload: User & { password?: string }) => Promise<void>;
}

const EditUserForm: FC<EditUserFormProps> = ({ currentUser, onEditUser }) => {
  const formId = useId();
  const { register, control, formState, handleSubmit } = useForm<FieldValues>({
    defaultValues: currentUser,
  });

  const onValid = async (fieldValues: FieldValues) => {
    toast.promise(onEditUser(fieldValues as any), {
      pending: 'Выполняется редактирование данных...',
      error: `При редактировании данных произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header mb-5">Редактирование пользователя</h1>
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
        Изменить данные
      </button>
    </form>
  );
};
export default EditUserForm;
