'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, FC, MouseEvent } from 'react';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
}

const LinkButton: FC<LinkButtonProps> = ({ href, ...buttonProps }) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    router.push(href);
    buttonProps.onClick?.(e);
  };

  return <button {...buttonProps} onClick={handleClick}></button>;
};
export default LinkButton;
