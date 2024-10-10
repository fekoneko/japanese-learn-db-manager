import SignInForm from '@/components/SignInForm';
import { signIn } from '@/lib/auth';
import { FC } from 'react';

const SignInPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <SignInForm
      onSignIn={async (credentials) => {
        'use server';
        return signIn('credentials', { ...credentials, redirectTo: '/' });
      }}
    />
  </div>
);
export default SignInPage;
