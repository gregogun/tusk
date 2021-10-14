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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface HeaderProps {
  css?: CSS;
  children?: React.ReactNode;
}

export const Header = ({ ...props }: HeaderProps) => {
  const { data: session, status } = useSession();
  const { css } = props;

  return (
    <header className={header({ css: css })}>
      <LogoLink>
        <Logo
          css={{
            '@bp1': {
              width: '64px',
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
          <Link href="/dashboard" passHref>
            <button
              onClick={() => signIn()}
              className={button({
                variant: 'ghost',
                css: {
                  mr: '$4',
                },
              })}
            >
              Log In
            </button>
          </Link>
          <Link href="/demo" passHref>
            <a
              className={linkButton({
                variant: 'brandOutline',
              })}
            >
              Try the demo
            </a>
          </Link>
        </Box>
      )}
    </header>
  );
};
