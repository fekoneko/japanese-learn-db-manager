'use client';

import useRedirect from '@/hooks/use-redirect';
import { FC } from 'react';

const SearchPage: FC = () => {
  useRedirect('/search/words');
  return null;
};
export default SearchPage;
