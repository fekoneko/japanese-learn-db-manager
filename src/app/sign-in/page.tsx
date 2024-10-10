import { signIn } from '@/lib/auth';
import { FC } from 'react';

const SignInPage: FC = () => (
  <form
    action={async (formData) => {
      'use server';
      await signIn('credentials', formData);
    }}
  >
    {/* TOD: use form compoenet */}
    <label>
      Email
      <input name="email" type="email" />
    </label>
    <label>
      Password
      <input name="password" type="password" />
    </label>
    <button>Sign In</button>
  </form>
);
export default SignInPage;
