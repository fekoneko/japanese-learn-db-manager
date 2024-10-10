'use client';

import useRedirect from '@/hooks/use-redirect';
import { FC } from 'react';

export interface RedirectProps {
  to: string;
}

const Redirect: FC<RedirectProps> = ({ to }) => {
  useRedirect(to);
  return null;
};
export default Redirect;
