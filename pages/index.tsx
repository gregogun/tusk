// index.tsx
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { css } from '../stitches.config';
import Link from 'next/link';
import { button } from '@/components/button';
import { linkButton } from '@/components/link';
import { text } from '@/components/text';
import Image from 'next/image';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Box, Flex, Main } from '@/components/layout';

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
  return (
    <>
      <BackgroundImage />
      <Container title="Tusk">
        <Header
          css={{
            mb: '$9',
          }}
        >
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
              <a
                className={linkButton({
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
                Try the demo
              </a>
            </Link>
          </Box>
        </Header>
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
                  '@bp1': '2xl',
                  '@bp2': '4xl',
                },
                weight: 'regular',
              })}
            >
              a better way to manage your <span className={strikethrough()}>tusks</span> tasks
            </h1>
            <p
              className={text({
                size: {
                  '@bp1': 'xs',
                  '@bp2': 'md',
                },
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
              <Link href="/dashboard" passHref>
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
              <Link href="/" passHref>
                <a
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
              </Link>
            </Flex>
          </Box>
        </Main>
      </Container>
    </>
  );
}
