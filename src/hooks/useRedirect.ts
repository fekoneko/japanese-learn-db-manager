import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useRedirect = (url: string) => {
  const router = useRouter();
  useEffect(() => {
    router.push(url);
  });
};
export default useRedirect;
