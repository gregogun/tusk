import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { IdProvider } from '@radix-ui/react-id';
import { Toaster } from 'react-hot-toast';

const MyApp = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <IdProvider>
      <Toaster />
      <Component {...pageProps} />
    </IdProvider>
  </SessionProvider>
);
export default MyApp;
