'use client';

import { FC, useEffect, useId, useState } from 'react';
import FormField, { FormFieldInfo } from './FormField';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const formFieldsInfo: FormFieldInfo[] = [
  {
    name: 'sources',
    type: 'text',
    label: 'Фиды',
    array: true,
    options: { minLength: 1, maxLength: 2083 },
  },
];

const RssSourcesFormWithSources: FC = () => {
  const [sources, setSources] = useState<string[] | null>(null);

  useEffect(() => {
    fetch('/api/rss-sources')
      .then((response) => response.json())
      .then(setSources);
  }, []);

  if (!sources) return <div className="text-center">Загрузка...</div>;
  return <RssSourcesForm sources={sources} />;
};

interface RssSourcesFormProps {
  sources?: string[];
}

const RssSourcesForm: FC<RssSourcesFormProps> = ({ sources }) => {
  const formId = useId();
  const { register, control, formState, handleSubmit } = useForm({ defaultValues: { sources } });

  const onValid = async (fieldValues: FieldValues) => {
    const responsePromise = new Promise((resolve, reject) =>
      fetch('/api/rss-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldValues),
      }).then((response) => {
        if (response.ok) resolve(response);
        else reject();
      }),
    );

    toast.promise(responsePromise, {
      pending: `Добавление фидов...`,
      success: `Фиды добавлены`,
      error: `При добавлении фидов произошла ошибка`,
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
          register={register as any}
          control={control as any} // It's all a meme
          formId={formId}
          fieldInfo={fieldInfo}
          formState={formState}
        />
      ))}

      <button className="col-span-2" type="submit">
        Добавить фиды
      </button>
    </form>
  );
};
export default RssSourcesFormWithSources;
