import { RegisterOptions } from 'react-hook-form';

export interface FormField {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  options?: RegisterOptions;
}
