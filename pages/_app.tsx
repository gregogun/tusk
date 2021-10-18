import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { IdProvider } from '@radix-ui/react-id';

const MyApp = ({ Component, pageProps }) => (
  <SessionProvider session={pageProps.session}>
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  </SessionProvider>
);
export default MyApp;
