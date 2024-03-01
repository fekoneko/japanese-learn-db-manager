'use client';

import useRedirect from '@/hooks/useRedirect';

const AddPage = () => {
  useRedirect('/add/words');
  return null;
};
export default AddPage;
