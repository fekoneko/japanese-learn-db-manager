"use client";

import { FormFieldInfo } from "@/@types/globals";
import { Fragment } from "react";
import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import InputError from "./InputError";

interface ArrayInputProps {
  register: UseFormRegister<FieldValues>;
  control: Control;
  formId: string;
  fieldInfo: FormFieldInfo;
  formState: FormState<FieldValues>;
}
const ArrayInput = ({
  register,
  control,
  formId,
  fieldInfo,
  formState,
}: ArrayInputProps) => {
  const { fields, append, remove } = useFieldArray({
    name: fieldInfo.name,
    control,
  });

  return (
    <fieldset
      id={formId + fieldInfo.name}
      className="grid grid-cols-[1fr_2fr] gap-3"
    >
      <label htmlFor={formId + fieldInfo.name}>
        {fieldInfo.label}
        {fieldInfo.options?.required && (
          <span className="font-bold text-red-500">*</span>
        )}
        :
      </label>
      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex gap-2">
              <input
                type={fieldInfo.type}
                {...register(`${fieldInfo.name}.${index}`, fieldInfo.options)}
                className="grow border"
              />
              <button type="button" onClick={() => remove(index)}>
                x
              </button>
            </div>
            <InputError
              errorType={
                typeof formState?.errors[fieldInfo.name] === "object"
                  ? (formState?.errors[fieldInfo.name] as any)[index]?.type
                  : undefined
              }
            />
          </Fragment>
        ))}
        <button
          type="button"
          onClick={() =>
            append("", { focusName: `${fieldInfo.name}.${fields.length}` })
          }
        >
          +
        </button>
      </div>
    </fieldset>
  );
};
export default ArrayInput;
