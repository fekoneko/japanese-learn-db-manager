"use client";

import { FormFieldInfo } from "@/@types/globals";
import { FieldValues, FormState, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";

interface InputProps {
  register: UseFormRegister<FieldValues>;
  formId: string;
  fieldInfo: FormFieldInfo;
  formState: FormState<FieldValues>;
}
const Input = ({ register, formId, fieldInfo, formState }: InputProps) => {
  return (
    <>
      <fieldset className="grid grid-cols-[1fr_2fr] gap-3">
        <label htmlFor={formId + fieldInfo.name}>
          {fieldInfo.label}
          {fieldInfo.options?.required && (
            <span className="font-bold text-red-500">*</span>
          )}
          :
        </label>
        <input
          type={fieldInfo.type}
          id={formId + fieldInfo.name}
          {...register(fieldInfo.name, fieldInfo.options)}
          className="border"
        />
      </fieldset>

      <InputError errorType={formState?.errors[fieldInfo.name]?.type} />
    </>
  );
};
export default Input;
