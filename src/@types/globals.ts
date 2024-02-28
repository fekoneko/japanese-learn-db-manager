import { RegisterOptions } from 'react-hook-form';

export interface FormFieldInfo {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  array?: boolean;
  options?: RegisterOptions;
}
