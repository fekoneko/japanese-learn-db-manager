'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes, FC, MouseEvent } from 'react';

export interface LinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href: string;
  inNewTab?: boolean;
}

const LinkButton: FC<LinkButtonProps> = ({ href, inNewTab, ...buttonProps }) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    buttonProps.onClick?.(e);

    if (inNewTab) window.open(href, '_blank');
    else router.push(href);
  };

  return <button {...buttonProps} onClick={handleClick}></button>;
};
export default LinkButton;
