import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Авдеев Андрей, ИВТ1-Б21',
  description: '',
};

interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ru">
      <body className="flex flex-col w-screen h-dvh bg-slate-300">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
