import React, { FC, useState, useEffect } from 'react';
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { Box, Flex } from '@/components/layout';
import { text } from '@/components/text';
import { button } from '@/components/button';
import { Github } from '@/components/icons/github';
import { Twitter } from '@/components/icons/twitter';
import { Logo } from '@/components/icons/logo';

const Login: FC = () => {
  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <Box css={{ display: 'grid', placeItems: 'center', height: '90vh' }}>
      <Flex css={{ flexDirection: 'column', gap: '$6', height: '$8xl', alignItems: 'center' }}>
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
        <Box>
          {providers?.twitter && (
            <button
              className={button({
                variant: 'outline',
                size: 'lg',
                css: { display: 'flex', alignItems: 'center', gap: '$4', mb: '$4' },
              })}
              type="button"
              onClick={() => signIn(providers.twitter.id)}
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
              onClick={() => signIn(providers.github.id)}
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
