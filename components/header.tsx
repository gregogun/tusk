/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
import { CSS, css } from 'stitches.config';
import { Logo } from '@/components/icons/logo';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { linkButton } from './link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { button } from './button';
import { Box } from './layout';

const LogoLink = ({ children }) => {
  return (
    <Link href="/" passHref>
      <a
        className={linkButton({
          variant: 'ghost',
        })}
      >
        {children}
        <VisuallyHidden.Root>Home</VisuallyHidden.Root>
      </a>
    </Link>
  );
};

const header = css({
  '@bp1': {
    padding: '$4',
  },
  '@bp2': {
    padding: '$2 $4',
  },
  width: '100%',
  margin: '0 auto',
  mb: '$6',
});

const navbar = css({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '1024px',
});

interface HeaderProps {
  css?: CSS;
  children?: React.ReactNode;
}

export const Header = ({ ...props }: HeaderProps) => {
  const { data: session, status } = useSession();
  const { css } = props;

  return (
    <header
      className={header({
        css: {
          borderBottom: session ? '1px solid $colors$gray' : 'none',
          // pt: session ? '$2' : '$6',
        },
      })}
    >
      <nav className={navbar({ css: css })}>
        <LogoLink>
          <Logo
            css={{
              '@bp1': {
                width: '96px',
              },
              '@bp2': {
                width: '144px',
              },
            }}
          />
        </LogoLink>
        {session ? (
          <button onClick={() => signOut()} className={button({ variant: 'outline' })}>
            Sign Out
          </button>
        ) : (
          <Box
            css={{
              '@bp1': {
                display: 'none',
              },
              '@bp2': {
                display: 'block',
              },
            }}
          >
            <Link href="/login" passHref>
              <a
                className={button({
                  variant: 'ghost',
                  css: {
                    mr: '$4',
                  },
                })}
              >
                Log In
              </a>
            </Link>
            <Link href="/demo" passHref>
              <a
                className={linkButton({
                  variant: 'brandOutline',
                })}
              >
                Watch the demo
              </a>
            </Link>
          </Box>
        )}
      </nav>
    </header>
  );
};
