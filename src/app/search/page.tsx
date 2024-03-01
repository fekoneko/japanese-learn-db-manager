'use client';

import useRedirect from '@/hooks/useRedirect';

const SearchPage = () => {
  useRedirect('/search/words');
  return null;
};
export default SearchPage;
