// _app.tsx
import '@styles/globals.css';

import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </SessionProvider>
);
export default MyApp;
