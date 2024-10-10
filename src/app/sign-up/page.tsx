import SignUpForm from '@/components/SignUpForm';
import { signIn } from '@/lib/auth';
import { createUser } from '@/lib/user';
import { FC } from 'react';

const SignUpPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <SignUpForm
      onSignUp={async (user) => {
        'use server';
        await createUser(user);
        await signIn('credentials', {
          email: user.email,
          password: user.password,
          redirectTo: '/',
        });
      }}
    />
  </div>
);
export default SignUpPage;
