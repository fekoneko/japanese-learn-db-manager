'use client';

import useRedirect from '@/hooks/use-redirect';

const AddPage = () => {
  useRedirect('/add/words');
  return null;
};
export default AddPage;
