import 'next-auth';

declare module 'next-auth' {
  type User = {
    email: string;
    name?: string;
    image?: string;
  };

  interface Session {
    user?: User;
  }
}
