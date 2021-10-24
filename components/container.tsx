import Head from 'next/head';
import { CSS, styled } from 'stitches.config';
import { link } from './link';
import { text } from './text';

const Wrapper = styled('div', {
  margin: '0 auto',
  width: '100%',
  position: 'relative',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Footer = styled('footer', {
  display: 'grid',
  placeItems: 'center',
  p: '$6',
});

interface ContainerProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
  css?: CSS;
  children: React.ReactNode;
}

export const Container = ({ ...props }: ContainerProps) => {
  const { children, css, ...customMeta } = props;
  const meta = {
    title: 'Tusk',
    description: 'A simple tool to manage the tasks that are most important to you.',
    //   image: 'https://sitename.com/static/images/banner.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <Wrapper css={{ css }}>
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Tusk" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        {/* <meta name="twitter:site" content="@gregogun" /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#171717" />
        <meta name="msapplication-TileColor" content="#171717" />
        <meta name="theme-color" content="#171717" />
      </Head>
      {children}
      <Footer css={{ textAlign: 'center' }}>
        <p className={text()}>
          <a className={link()} href="https://github.com/gregogun/tusk">
            Designed and built
          </a>
          {''} by {''}
          <a className={link()} href="https://github.com/gregogun">
            Greg Ogun.
          </a>
          {''} Powered by {''}
          <a className={link()} href="https://nextjs.org/">
            Next.js
          </a>
        </p>
      </Footer>
    </Wrapper>
  );
};
