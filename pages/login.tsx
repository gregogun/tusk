import React, { FC, useState, useEffect } from 'react';
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { Box, Flex } from '@/components/layout';
import { text } from '@/components/text';
import { button } from '@/components/button';
import { Github } from '@/components/icons/github';
import { Twitter } from '@/components/icons/twitter';
import { Logo } from '@/components/icons/logo';
import Link from 'next/link';
import { linkButton } from '@/components/link';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

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

const Login: FC = () => {
  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(providers);
    if (providers) {
      console.log(providers);
    }
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <Box css={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
      <Flex css={{ flexDirection: 'column', gap: '$6', height: '$8xl', alignItems: 'center' }}>
        <LogoLink>
          <Logo
            css={{
              width: '144px',
            }}
          />
        </LogoLink>
        <Box>
          {providers?.twitter && (
            <button
              className={button({
                variant: 'outline',
                size: 'lg',
                css: { display: 'flex', alignItems: 'center', gap: '$4', mb: '$4' },
              })}
              type="button"
              onClick={() =>
                signIn(providers.twitter.id, {
                  callbackUrl: `${(window.location, origin)}/app`,
                })
              }
            >
              Sign In With Twitter
              <span>
                <Twitter css={{ boxSize: '$lg', fill: '#1DA1F2' }} />
              </span>
            </button>
          )}
          {providers?.github && (
            <button
              className={button({
                variant: 'outline',
                size: 'lg',
                css: { display: 'flex', alignItems: 'center', gap: '$4' },
              })}
              type="button"
              onClick={() =>
                signIn(providers.github.id, {
                  callbackUrl: `${(window.location, origin)}/app`,
                })
              }
            >
              Sign In With Github
              <span>
                <Github css={{ boxSize: '$lg', fill: '$white' }} />
              </span>
            </button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
