import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/footer';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { companyName, siteDescription } from '@/constants';
declare global {
  interface Window {
    gtag?: (command: 'config' | 'event' | 'js', targetId: string, config?: Record<string, unknown>) => void;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
    const handleRouteChange = (url: string) => {
      // if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      //   window.gtag?.('config', "G-QB7MSTBF7V", {
      //     page_path: url,
      //   });
      // }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{`${companyName} | ${siteDescription}`}</title>
        <meta name={siteDescription} />
      </Head>
      <div className="app-container">
        <div className='header-container'>
          <Header />
        </div>
        <div className='header-backer'/>
        <main className='main-content'>
          <Component {...pageProps} />
        </main>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default MyApp;
