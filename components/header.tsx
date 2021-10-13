/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable object-shorthand */
import { CSS, css } from 'stitches.config';
import { Logo } from '@/components/icons/logo';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { linkButton } from './link';

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
  const { children, css } = props;
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
      {children}
    </header>
  );
};
