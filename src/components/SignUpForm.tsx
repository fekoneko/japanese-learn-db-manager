'use client';

import { FC, useId } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import FormField, { FormFieldInfo } from './FormField';
import { toast } from 'react-toastify';
import { User } from 'next-auth';
import Link from 'next/link';

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

export interface SignUpFormProps {
  onSignUp: (credentials: User & { email: string; password: string }) => Promise<void>;
}

const SignUpForm: FC<SignUpFormProps> = ({ onSignUp }) => {
  const formId = useId();
  const { register, control, formState, handleSubmit } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    toast.promise(onSignUp(fieldValues as any), {
      pending: 'Выполняется регистрация...',
      error: `При регистрации произошла ошибка`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex w-1/2 min-w-max flex-col gap-2 rounded bg-white p-5 shadow-lg"
    >
      <h1 className="header mb-5">Регистрация</h1>
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

      <p className="mb-1 mt-2 text-center">
        Уже есть аккаунт?{' '}
        <Link href="/sign-in" className="font-semibold text-teal-600 hover:underline">
          Войдите
        </Link>
      </p>
    </form>
  );
};
export default SignUpForm;
