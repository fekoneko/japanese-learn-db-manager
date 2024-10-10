import SignUpForm from '@/components/SignUpForm';
import { createUser } from '@/lib/user';
import { FC } from 'react';

const SignUpPage: FC = () => (
  <div className="flex grow items-center justify-center p-5">
    <SignUpForm
      onSignUp={async (user) => {
        'use server';

        return createUser(user);
      }}
    />
  </div>
);
export default SignUpPage;
