'use client';

import useRedirect from '@/hooks/use-redirect';
import { FC } from 'react';

const AddPage: FC = () => {
  useRedirect('/add/words');
  return null;
};
export default AddPage;
