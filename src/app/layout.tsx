import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Slide, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Авдеев Андрей, ИВТ1-Б21',
  description: '',
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ru">
      <body className="min-h[360px] max-w-screen flex h-dvh min-w-[500px] flex-col bg-slate-200">
        <Header />
        <main className="flex grow flex-col overflow-hidden">{children}</main>
        <Footer />

        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
        />
      </body>
    </html>
  );
};
export default RootLayout;
