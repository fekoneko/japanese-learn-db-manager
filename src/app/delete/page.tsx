'use client';

import useRedirect from '@/hooks/use-redirect';

const SearchPage = () => {
  useRedirect('/delete/words');
  return null;
};
export default SearchPage;
