import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, validateUserPassword } from './user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async ({ email, password }) => {
        if (typeof email !== 'string') throw new Error('Username must be a string');
        if (typeof password !== 'string') throw new Error('Password must be a string');

        const user = await getUserByEmail(email);
        if (!(await validateUserPassword(user, password))) throw new Error('Invalid password');

        return user;
      },
    }),
  ],
});
