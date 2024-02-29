'use client';

import {
  Control,
  Controller,
  FieldValues,
  FormState,
  RegisterOptions,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import FormFieldError from './FormFieldError';
import ReactSelect, { GroupBase, OptionsOrGroups } from 'react-select';
import { Fragment, useCallback, useEffect, useState } from 'react';

export type GetOptionsFunction = (
  searchValue?: string,
) => Promise<OptionsOrGroups<any, GroupBase<string>>>;

export interface FormFieldInfo {
  name: string;
  type: React.HTMLInputTypeAttribute | 'select';
  label: string;
  array?: boolean;
  options?: RegisterOptions;
  getOptions?: GetOptionsFunction;
}

interface FormInputProps {
  register: UseFormRegister<FieldValues>;
  id?: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  options?: RegisterOptions;
  className?: string;
}
const FormInput = ({ register, id, name, type, options, className }: FormInputProps) => {
  return <input className={className} type={type} id={id} {...register(name, options)} />;
};

interface FormSelectProps {
  control: Control;
  id?: string;
  name: string;
  getOptions?: GetOptionsFunction;
  className?: string;
}
const FormSelect = ({ control, id, name, getOptions, className }: FormSelectProps) => {
  const [selectOptions, setSelectOptions] = useState<OptionsOrGroups<any, GroupBase<string>>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateOptions = useCallback(
    (searchValue?: string) => {
      if (getOptions) {
        setIsLoading(true);
        getOptions(searchValue).then((newOptions) => {
          setSelectOptions(newOptions);
          setIsLoading(false);
        });
      }
    },
    [getOptions],
  );

  useEffect(() => {
    updateOptions();
  }, [updateOptions]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <ReactSelect
          className={`react-select ${className}`}
          id={id}
          options={selectOptions}
          isLoading={isLoading}
          onChange={(newValue) => {
            onChange({ target: { value: newValue.value } });
          }}
          onInputChange={updateOptions}
          filterOption={() => true}
          ref={ref}
        />
      )}
    />
  );
};

interface FormFieldProps {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  formId: string;
  fieldInfo: FormFieldInfo;
  formState: FormState<FieldValues>;
}

const FormField = ({ register, control, formId, fieldInfo, formState }: FormFieldProps) => {
  if (fieldInfo.array)
    return (
      <FormFieldArray
        register={register}
        control={control}
        formId={formId}
        fieldInfo={fieldInfo}
        formState={formState}
      />
    );
  else
    return (
      <FormFieldPlain
        register={register}
        control={control}
        formId={formId}
        fieldInfo={fieldInfo}
        formState={formState}
      />
    );
};

const FormFieldPlain = ({ register, control, formId, fieldInfo, formState }: FormFieldProps) => {
  return (
    <>
      <fieldset className="grid grid-cols-[1fr_2fr] gap-3">
        <label htmlFor={formId + fieldInfo.name}>
          {fieldInfo.label}
          {fieldInfo.options?.required && <span className="font-bold text-red-500">*</span>}:
        </label>
        {fieldInfo.type === 'select' ? (
          <FormSelect
            control={control}
            id={formId + fieldInfo.name}
            name={fieldInfo.name}
            getOptions={fieldInfo.getOptions}
          />
        ) : (
          <FormInput
            register={register}
            id={formId + fieldInfo.name}
            name={fieldInfo.name}
            type={fieldInfo.type}
            options={fieldInfo.options}
          />
        )}
      </fieldset>

      <FormFieldError errorType={formState?.errors[fieldInfo.name]?.type} />
    </>
  );
};

const FormFieldArray = ({ register, control, formId, fieldInfo, formState }: FormFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    name: fieldInfo.name,
    control,
  });

  return (
    <fieldset id={formId + fieldInfo.name} className="grid grid-cols-[1fr_2fr] gap-3">
      <label htmlFor={formId + fieldInfo.name}>
        {fieldInfo.label}
        {fieldInfo.options?.required && <span className="font-bold text-red-500">*</span>}:
      </label>
      <div className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex gap-1">
              {fieldInfo.type === 'select' ? (
                <FormSelect
                  control={control}
                  name={fieldInfo.name}
                  getOptions={fieldInfo.getOptions}
                  className="grow"
                />
              ) : (
                <FormInput
                  register={register}
                  name={`${fieldInfo.name}.${index}`}
                  type={fieldInfo.type}
                  options={fieldInfo.options}
                  className="grow"
                />
              )}
              <button type="button" onClick={() => remove(index)}>
                x
              </button>
            </div>
            <FormFieldError
              errorType={
                typeof formState?.errors[fieldInfo.name] === 'object'
                  ? (formState?.errors[fieldInfo.name] as any)[index]?.type
                  : undefined
              }
            />
          </Fragment>
        ))}
        <button
          type="button"
          onClick={() => append('', { focusName: `${fieldInfo.name}.${fields.length}` })}
        >
          +
        </button>
      </div>
    </fieldset>
  );
};

export default FormField;
