import SignUpForm from '@/components/SignUpForm';
import { createUser } from '@/lib/user';
import { FC } from 'react';

const SignUpPage: FC = () => (
  <SignUpForm
    onSignUp={async (user) => {
      'use server';

      return createUser(user);
    }}
  />
);
export default SignUpPage;
