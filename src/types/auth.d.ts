import 'next-auth';

declare module 'next-auth' {
  type User = {
    email: string;
    name?: string | null;
    image?: string | null;
  };

  interface Session {
    user?: User;
  }
}
