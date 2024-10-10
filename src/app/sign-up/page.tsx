import SignUpForm from '@/components/SignUpForm';
import { createUser } from '@/lib/user';
import { signIn } from 'next-auth/react';
import { FC } from 'react';

const SignUpPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <SignUpForm
      onSignUp={async (user) => {
        'use server';
        await createUser(user);
        await signIn('credentials', { email: user.email, password: user.password });
      }}
    />
  </div>
);
export default SignUpPage;
