import { genSaltSync, hash } from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from './user';

const salt = genSaltSync(10);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async ({ email, password }) => {
        if (typeof email !== 'string') throw new Error('Username must be a string');
        if (typeof password !== 'string') throw new Error('Password must be a string');

        const passwordHash = await hash(password, salt);
        const user = await getUserByEmail(email);
        if (user.passwordHash !== passwordHash) throw new Error('Invalid password');

        return user;
      },
    }),
  ],
});
