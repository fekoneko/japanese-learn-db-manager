import SignUpForm from '@/components/SignUpForm';
import { signIn } from '@/lib/auth';
import { createUser } from '@/lib/user';
import { FC } from 'react';

const SignUpPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <SignUpForm
      onSignUp={async (payload) => {
        'use server';

        await createUser(payload);
        await signIn('credentials', {
          email: payload.email,
          skipPasswordCheck: true,
          redirectTo: '/profile',
        });
      }}
    />
  </div>
);
export default SignUpPage;
