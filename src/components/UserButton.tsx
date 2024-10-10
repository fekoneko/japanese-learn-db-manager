import { FC } from 'react';
import LinkButton from './LinkButton';
import { auth, signOut } from '@/lib/auth';

const UserButton: FC = async () => {
  const session = await auth();

  const handleSignOut = async () => {
    'use server';
    await signOut({ redirectTo: '/sign-in' });
  };

  return session ? (
    <form action={handleSignOut}>
      <button className="py-1 hover:bg-teal-400">Выйти</button>
    </form>
  ) : (
    <LinkButton href="/sign-in" className="py-1 hover:bg-teal-400">
      Войти
    </LinkButton>
  );
};
export default UserButton;
