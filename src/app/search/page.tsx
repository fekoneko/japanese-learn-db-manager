'use client';

import useRedirect from '@/hooks/use-redirect';

const SearchPage = () => {
  useRedirect('/search/words');
  return null;
};
export default SearchPage;
