import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Slide, ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { FC, PropsWithChildren } from 'react';
import Navigation from '@/components/Navigation';
import Script from 'next/script';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'JapaneseLearn DB',
  description: 'Японский - просто',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="ru">
    <head>
      <Script id="yandex-metrika-script" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(98585440, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
          });`}
      </Script>

      <script async src="https://aflt.market.yandex.ru/widget/script/api" type="text/javascript" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Блог Japanese Learn DB"
        href="/rss/blog"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Подборка статей от Japanese Learn DB"
        href="/rss/feed-compilation"
      />
    </head>

    <body className="max-w-screen flex min-h-dvh min-w-[500px] flex-col bg-slate-200">
      <SessionProvider>
        <div className="sticky top-0 z-50">
          <Header />
          <Navigation />
        </div>

        <main className="overflow-show mx-auto flex w-full max-w-[110rem] grow flex-col px-[10%]">
          {children}
        </main>
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
      </SessionProvider>
    </body>
  </html>
);
export default RootLayout;
