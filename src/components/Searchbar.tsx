'use client';

import { useCallback, useId, useMemo, useRef, useState } from 'react';
import {
  Control,
  FieldValues,
  FormState,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import FormField, { FormFieldInfo, GetOptionsFunction } from './FormField';

export interface SearchField<FieldName extends string> {
  name: FieldName;
  label: string;
}

export type SearchFieldValues<FieldName extends string = string> = {
  [fieldName in FieldName]: string;
};

export type SearchFunction<FieldName extends string = string> = (
  searchValue: { s?: string } & Partial<SearchFieldValues<FieldName>>,
  abortSignal?: AbortSignal,
) => any;

export type GetSearchFieldOptionsFunction<FieldName extends string = string> = (
  searchValue: Partial<SearchFieldValues<FieldName>>,
  fieldName: FieldName,
  abortSignal?: AbortSignal,
) => Promise<string[]>;

interface SearchbarFieldInputProps<FieldName extends string> {
  formId: string;
  field: SearchField<FieldName>;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues, any>;
  formState: FormState<FieldValues>;
  getOptions: GetOptionsFunction;
  onDisable?: () => any;
  onEnable?: () => any;
}
const SearchbarFieldInput = <FieldName extends string = string>({
  formId,
  field,
  register,
  control,
  formState,
  getOptions,
  onDisable,
  onEnable,
}: SearchbarFieldInputProps<FieldName>) => {
  const [fieldEnabled, setFieldEnabled] = useState(false);

  const fieldInfo: FormFieldInfo = useMemo(
    () => ({
      name: field.name,
      type: 'select',
      label: field.label,
      array: false,
      getOptions,
    }),
    [field, getOptions],
  );

  return (
    <div className="flex items-center gap-2">
      <div
        className={
          'grow [&>*>*>[class*="control"]]:!border-slate-400 [&>*>*>[class*="menu"]]:!top-[unset] [&>*>*>[class*="menu"]]:!w-[calc(66.666666%-1.666666rem)] [&>*>*]:!static ' +
          (fieldEnabled
            ? '[&>*>*>[class*="control"]]:!bg-transparent'
            : '[&>*>*>[class*="control"]]:!bg-slate-200')
        } // Don't question it
      >
        <FormField
          register={register}
          control={control}
          formId={formId}
          formState={formState}
          fieldInfo={fieldInfo}
          disabled={!fieldEnabled}
        />
      </div>

      <label htmlFor={formId + '-' + field.name + '-enable'} className="absolute top-[-999999px]">
        Включить поиск по атрибуту &ldquo;{field.label}&rdquo;:
      </label>
      <input
        type="checkbox"
        id={formId + '-' + field.name + '-enable'}
        checked={fieldEnabled}
        onChange={(e) => {
          setFieldEnabled(e.target.checked);
          if (e.target.checked && onEnable) onEnable();
          else if (!e.target.checked && onDisable) onDisable();
        }}
        className="min-h-[1.2rem] min-w-[1.2rem]"
      />
    </div>
  );
};

interface SearchbarProps<FieldName extends string> {
  search: SearchFunction<FieldName>;
  getFieldOptions: GetSearchFieldOptionsFunction<FieldName>;
  fields?: SearchField<FieldName>[];
}
const Searchbar = <FieldName extends string = string>({
  search,
  getFieldOptions,
  fields,
}: SearchbarProps<FieldName>) => {
  const formId = useId();
  const [fieldsEnabled, setFieldsEnabled] = useState(false);
  const { register, control, formState, handleSubmit, getValues } = useForm();
  const abortControllerRef = useRef<AbortController>();
  const searchFieldsRef = useRef<HTMLDivElement>(null);

  const onValidSubmit: SubmitHandler<FieldValues> = (fieldValues) => {
    abortControllerRef.current?.abort('search value changed');
    abortControllerRef.current = new AbortController();

    const searchValue =
      fieldsEnabled && fields
        ? fields.reduce((prev, field) => {
            if (fieldValues[field.name]) prev[field.name] = fieldValues[field.name];
            return prev;
          }, {} as any)
        : { s: fieldValues.search };
    search(searchValue, abortControllerRef.current?.signal);
  };

  const getOptions = async (
    fieldSearchValue: string | undefined,
    fieldName: FieldName,
    abortSignal?: AbortSignal,
  ) => {
    const fieldValues = getValues();
    const searchValue = {
      ...(fieldsEnabled && fields
        ? fields.reduce((prev, field) => {
            if (fieldValues[field.name]) prev[field.name] = fieldValues[field.name];
            return prev;
          }, {} as any)
        : {}),
      [fieldName]: fieldSearchValue,
    };
    const options = await getFieldOptions(searchValue, fieldName, abortSignal);
    return options.map((option) => ({ value: option, label: option }));
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="flex flex-col gap-2">
      <fieldset className="flex gap-2">
        <input
          id={formId + '-search'}
          {...register('search')}
          type="search"
          role="search"
          autoFocus
          autoComplete="off"
          disabled={fieldsEnabled}
          placeholder="Введите поисковой запрос..."
          className="grow border-slate-400 bg-transparent pl-4 transition-colors placeholder:text-slate-500 disabled:bg-slate-200"
        />
        <button type="submit" className="border-slate-400">
          Поиск
        </button>
      </fieldset>

      {fields?.length && (
        <>
          <div className="relative">
            <div
              className="overflow-hidden transition-[height] duration-500"
              style={
                fieldsEnabled ? { height: searchFieldsRef.current!.offsetHeight } : { height: 0 }
              }
            >
              <div ref={searchFieldsRef} className="flex flex-col gap-1">
                {fields.map((field) => (
                  <SearchbarFieldInput
                    key={field.name}
                    formId={formId}
                    field={field}
                    register={register}
                    control={control}
                    formState={formState}
                    getOptions={(searchValue, abortSignal) =>
                      getOptions(searchValue, field.name, abortSignal)
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFieldsEnabled((prev) => !prev)}
            className="border-[1.5px] border-slate-400"
          >
            {fieldsEnabled
              ? 'Включить поиск по всем атрибутам'
              : 'Включить поиск по отдельным атрибутам'}
          </button>
        </>
      )}
    </form>
  );
};
export default Searchbar;
