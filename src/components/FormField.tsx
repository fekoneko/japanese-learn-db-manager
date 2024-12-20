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
import { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';

export type GetOptionsFunction = (
  searchValue?: string,
  abortSignal?: AbortSignal,
) => Promise<OptionsOrGroups<any, GroupBase<string>>>;

export interface FormFieldInfo {
  name: string;
  type: React.HTMLInputTypeAttribute | 'select' | 'textarea';
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
  disabled?: boolean;
}
const FormInput: FC<FormInputProps> = ({
  register,
  id,
  name,
  type,
  options,
  className,
  disabled,
}) => (
  <input
    className={className}
    disabled={disabled}
    type={type}
    id={id}
    {...register(name, options)}
  />
);

const FormTextArea: FC<Omit<FormInputProps, 'type'>> = ({
  register,
  id,
  name,
  options,
  className,
  disabled,
}) => <textarea className={className} disabled={disabled} id={id} {...register(name, options)} />;

interface FormSelectProps {
  control: Control;
  id?: string;
  name: string;
  getOptions?: GetOptionsFunction;
  className?: string;
  disabled?: boolean;
}
const FormSelect: FC<FormSelectProps> = ({
  control,
  id,
  name,
  getOptions,
  className,
  disabled,
}) => {
  const [selectOptions, setSelectOptions] = useState<OptionsOrGroups<any, GroupBase<string>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController>();
  const [searchValue, setSearchValue] = useState('');
  const [expanded, setExpanded] = useState(false);

  const updateOptions = useCallback(() => {
    if (!getOptions) return;

    abortControllerRef.current?.abort('search value changed');
    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    getOptions(searchValue, abortControllerRef.current?.signal)
      .then((newOptions) => {
        setSelectOptions(newOptions);
        setIsLoading(false);
      })
      .catch(() => {});
  }, [getOptions, setIsLoading, setSelectOptions, searchValue]);

  useEffect(() => {
    if (expanded) updateOptions();
  }, [updateOptions, expanded]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ref } }) => (
        <ReactSelect
          ref={(select) => {
            ref(select);
            if (disabled) select?.clearValue(); // Forgive me
          }}
          className={`react-select ${className}`}
          isClearable={true}
          isDisabled={disabled}
          id={id}
          instanceId={id}
          options={selectOptions}
          isLoading={isLoading}
          onChange={(newValue) => onChange({ target: { value: newValue?.value } })}
          onInputChange={(newSearchValue) => setSearchValue(newSearchValue)}
          onMenuOpen={() => setExpanded(true)}
          onMenuClose={() => setExpanded(false)}
          filterOption={() => true}
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
  disabled?: boolean;
}

const FormField: FC<FormFieldProps> = ({
  register,
  control,
  formId,
  fieldInfo,
  formState,
  disabled,
}) => {
  if (fieldInfo.array)
    return (
      <FormFieldArray
        register={register}
        control={control}
        formId={formId}
        fieldInfo={fieldInfo}
        formState={formState}
        disabled={disabled}
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
        disabled={disabled}
      />
    );
};

const FormFieldPlain: FC<FormFieldProps> = ({
  register,
  control,
  formId,
  fieldInfo,
  formState,
  disabled,
}) => (
  <>
    <fieldset className="grid grid-cols-[1fr_2fr] items-center gap-3">
      <label htmlFor={formId + '-' + fieldInfo.name} className="leading-5">
        {fieldInfo.label}
        {fieldInfo.options?.required && <span className="font-bold text-red-500">*</span>}:
      </label>
      {fieldInfo.type === 'select' ? (
        <FormSelect
          control={control}
          id={formId + '-' + fieldInfo.name}
          name={fieldInfo.name}
          getOptions={fieldInfo.getOptions}
          disabled={disabled}
        />
      ) : fieldInfo.type === 'textarea' ? (
        <FormTextArea
          register={register}
          id={formId + '-' + fieldInfo.name}
          name={fieldInfo.name}
          options={fieldInfo.options}
          disabled={disabled}
        />
      ) : (
        <FormInput
          register={register}
          id={formId + '-' + fieldInfo.name}
          name={fieldInfo.name}
          type={fieldInfo.type}
          options={fieldInfo.options}
          disabled={disabled}
        />
      )}
    </fieldset>

    <FormFieldError errorType={formState?.errors[fieldInfo.name]?.type} />
  </>
);

const FormFieldArray: FC<FormFieldProps> = ({
  register,
  control,
  formId,
  fieldInfo,
  formState,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: fieldInfo.name,
    control,
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) remove();
  }, [formState.isSubmitSuccessful, remove]);

  return (
    <fieldset id={formId + fieldInfo.name} className="grid grid-cols-[1fr_2fr] gap-3">
      <label htmlFor={formId + fieldInfo.name} className="leading-5">
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
                  name={`${fieldInfo.name}.${index}`}
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
