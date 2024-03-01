import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Slide, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

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
      <body className="min-h[360px] flex h-dvh w-screen min-w-[500px] flex-col bg-slate-300">
        <Header />
        <main className="grow">{children}</main>
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
