import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Slide, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { FC, PropsWithChildren } from 'react';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'JapaneseLearn DB',
  description: 'Японский - просто',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <body className="max-w-screen flex min-h-dvh min-w-[500px] flex-col bg-slate-200">
      <div className="sticky top-0 z-50">
        <Header />
        <Navigation />
      </div>

      <main className="overflow-show flex grow flex-col">{children}</main>
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
export default RootLayout;
