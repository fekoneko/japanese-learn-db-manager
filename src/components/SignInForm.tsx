'use client';

import { FC, useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormField, { FormFieldInfo } from './FormField';
import { toast } from 'react-toastify';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Эл. почта',
    options: { required: true, minLength: 5, maxLength: 2083 },
  },
  {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    options: { required: true, minLength: 8, maxLength: 256 },
  },
];

export interface SignInFormProps {
  onSignIn: (credentials: { user: string; password: string }) => Promise<void>;
}

const SignInForm: FC<SignInFormProps> = ({ onSignIn }) => {
  const formId = useId();
  const { register, control, formState, handleSubmit } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    toast.promise(onSignIn(fieldValues as any), {
      pending: 'Выполняется вход...',
      error: `При входе произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header mb-5">Вход</h1>
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
        Войти
      </button>
    </form>
  );
};
export default SignInForm;
