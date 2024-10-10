import SignInForm from '@/components/SignInForm';
import { signIn } from '@/lib/auth';
import { FC } from 'react';

const SignInPage: FC = () => (
  <SignInForm
    onSignIn={async (credentials) => {
      'use server';

      return signIn('credentials', credentials);
    }}
  />
);
export default SignInPage;
