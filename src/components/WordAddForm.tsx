"use client";

import { FormFieldInfo } from "@/@types/globals";
import { useId } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ArrayInput from "./ArrayInput";
import Input from "./Input";

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: "Word",
    type: "text",
    label: "Word",
    options: { required: true, minLength: 1, maxLength: 30 },
  },
  {
    name: "Reading",
    type: "text",
    label: "Reading",
    options: { required: true, minLength: 1, maxLength: 30 },
  },
  {
    name: "PitchAccents",
    type: "number",
    label: "PitchAccents",
    array: true,
    options: { min: 1, max: 30 },
  },
  {
    name: "Meanings",
    type: "text",
    label: "Meanings",
    array: true,
    options: { minLength: 1, maxLength: 30 },
  },
  {
    name: "Popularity",
    type: "number",
    label: "Popularity",
    options: { min: 1, max: 2147483648 },
  },
  {
    name: "OtherVariants",
    type: "text",
    label: "OtherVarints",
    array: true,
    options: { minLength: 1, maxLength: 30 },
  },
];

const WordAddForm = () => {
  const formId = useId();
  const { register, control, formState, handleSubmit } = useForm();

  const onValid = async (fieldValues: FieldValues) => {
    console.log(fieldValues);

    const newWord: any = {};
    newWord.Word = fieldValues.Word;
    newWord.Reading = fieldValues.Reading;
    newWord.PitchAccents = (fieldValues.PitchAccents as string[]).map(
      (value) => +value,
    );
    newWord.Meanings = fieldValues.Meanings;
    newWord.Popularity = +fieldValues.Popularity;
    newWord.OtherVariants = fieldValues.OtherVariants;

    console.log(
      await fetch("/api/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWord),
      }),
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col gap-3 bg-white p-5 shadow-lg"
    >
      <h1 className="header">Add Word</h1>
      {formFieldsInfo.map((fieldInfo, index) =>
        fieldInfo.array ? (
          <ArrayInput
            key={index}
            register={register}
            control={control}
            formId={formId}
            fieldInfo={fieldInfo}
            formState={formState}
          />
        ) : (
          <Input
            key={index}
            register={register}
            formId={formId}
            fieldInfo={fieldInfo}
            formState={formState}
          />
        ),
      )}

      <button className="col-span-2" type="submit">
        Submit
      </button>
    </form>
  );
};
export default WordAddForm;
