import '../styles/globals.css';
import type { AppProps } from "next/app";
import React, {useEffect} from 'react';

const App = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    if (typeof window !== "undefined" && 'serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('PWA service worker ready');
        registration.update();
      }).catch(error => {
        console.log('PWA service worker registration failed', error);
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default App;