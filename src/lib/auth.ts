import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, validateUserPassword } from './user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {}, skipPasswordCheck: {} },
      authorize: async ({ email, password, skipPasswordCheck }) => {
        if (typeof email !== 'string') throw new Error('Username must be a string');

        if (skipPasswordCheck !== 'true' && typeof password !== 'string')
          throw new Error('Password must be a string');

        const user = await getUserByEmail(email);

        if (skipPasswordCheck !== 'true' && !(await validateUserPassword(user, password as string)))
          throw new Error('Invalid password');

        return user;
      },
    }),
  ],
});
