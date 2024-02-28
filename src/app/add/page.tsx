'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AddPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/add/words');
  });

  return null;
};
export default AddPage;
