// index.tsx
import React, { useEffect } from 'react';
import { css } from '../stitches.config';
import Link from 'next/link';
import { button } from '@/components/button';
import { text } from '@/components/text';
import Image from 'next/image';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Box, Flex, Main } from '@/components/layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const strikethrough = css({ textDecoration: 'line-through' });

const backgroundImg = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: '$hide',
});

const BackgroundImage = () => {
  return (
    <Image
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className={backgroundImg()}
      src="/static/images/background.png"
      alt=""
    />
  );
};

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && status !== 'loading') {
    router.push('/app');
  }

  return (
    <>
      <BackgroundImage />
      <Container title="Tusk">
        <Header
          css={{
            width: '100%',
          }}
        />
        <Main>
          <Box
            css={{
              '@bp1': {
                maxWidth: '288px',
              },
              '@bp2': {
                maxWidth: '512px',
              },

              margin: 'auto',
              textAlign: 'center',
              mb: '$8',
            }}
          >
            <h1
              className={text({
                size: {
                  '@bp1': '3xl',
                  '@bp2': '4xl',
                },
                weight: 'regular',
                css: {
                  mb: '$6',
                },
              })}
            >
              a better way to manage your <span className={strikethrough()}>tusks</span> tasks
            </h1>
            <p
              className={text({
                size: 'md',
                css: {
                  mb: '$8',
                },
              })}
            >
              Never feel overwhelmed again with a tool dedicated to helping you keep track of daily tasks.
            </p>
            <Flex
              css={{
                '@bp1': {
                  flexDirection: 'column',
                },
                '@bp2': {
                  flexDirection: 'row',
                },

                justifyContent: 'center',
              }}
            >
              <Link href="/login" passHref>
                <a
                  className={button({
                    variant: 'brandOutline',
                    css: {
                      mr: '$4',
                      mb: '$4',
                      maxHeight: '48px',
                    },
                  })}
                >
                  Get Started
                </a>
              </Link>
              <a
                href="https://github.com/gregogun/tusk"
                className={button({
                  variant: 'solid',
                  css: {
                    mr: '$4',
                    maxHeight: '48px',
                  },
                })}
              >
                Learn More
              </a>
            </Flex>
          </Box>
        </Main>
      </Container>
    </>
  );
}
