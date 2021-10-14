/* eslint-disable react/jsx-no-bind */
/* eslint-disable promise/always-return */
import React, { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Box, Flex, Main } from '@/components/layout';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { CollectionPayload } from '@/lib/prisma';
import { Session } from 'next-auth';
import { Collection } from '.prisma/client';
import { text } from '@/components/text';
import { button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { styled } from 'stitches.config';
import { link } from '@/components/link';

const ListItem = styled('li', {});

// <------------------CollectionsList------------------------>

interface CollectionsListProps {
  session: Session;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  //collections: Collection[];
}

interface ToastState {
  state: 'success' | 'error' | 'idle';
  message: string;
}

const CollectionsList = ({ session, status }: CollectionsListProps) => {
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState<Collection[] | null>([]);
  const [toastAlert, setToastAlert] = useState<ToastState>({ state: 'idle', message: '' });

  useEffect(() => {
    if (session) {
      fetchCollections(/* session.userId */);
    }
  }, [session]);

  async function fetchCollections(/* id: number */) {
    const response = await fetch('/api/collections', {
      // method: 'POST',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(id),
    });

    const data = await response.json();

    console.log(data.collections);

    setCollections(data.collections);
  }

  async function handleClick() {
    if (collectionName !== '') {
      const payload: CollectionPayload = {
        name: collectionName,
        id: session.userId,
      };

      const res = await fetch('/api/collection', {
        body: JSON.stringify({
          payload: payload,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const { error } = await res.json();
      if (error) {
        setToastAlert({ state: 'error', message: error });
        return;
      }

      // const newCollection: Collection = await getCreatedCollection(response.id);

      // console.log('Collection successfully created!', response.id);

      // setCollections([newCollection, ...collections]);

      fetchCollections(/* session.userId */);

      setToastAlert({
        state: 'success',
        message: 'Collection successfully created!',
      });
    } else {
      console.log('Please enter a name for your collection');
    }
  }

  async function getCreatedCollection(id) {
    const res = await fetch('/api/collection/getUnique', {
      body: JSON.stringify({
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    return res.json();
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session && status !== 'loading') {
    return <h1>You are not authenticated. Please sign in.</h1>;
  }

  return (
    <Flex css={{ flexDirection: 'column', gap: '$6' }}>
      {collections.length > 0 ? (
        <>
          <h1 className={text({ size: '2xl', css: { textAlign: 'center' } })}>Collections</h1>
          <Dialog collections={collections} setCollectionName={setCollectionName} handleClick={handleClick} />
          <ul>
            {collections
              .map((collection) => (
                <ListItem
                  css={{
                    p: '$6',
                    borderRadius: '$md',
                    boxShadow: '0 0 0 2px $colors$lightGray',
                    position: 'relative',
                    mb: '$4',
                  }}
                  key={collection.id}
                >
                  <Link href={`/app/collection/${collection.id}`} passHref>
                    <a
                      className={link({
                        type: 'ghost',
                        css: { position: 'absolute', top: 8, right: 0, bottom: 0, left: 8 },
                      })}
                    >
                      <p className={text({ size: 'lg' })}>{collection.name}</p>
                    </a>
                  </Link>
                </ListItem>
              ))
              .reverse()}
          </ul>
        </>
      ) : (
        <>
          <h1 className={text({ size: '2xl', css: { textAlign: 'center' } })}>You have no collections</h1>
          <Dialog collections={collections} setCollectionName={setCollectionName} handleClick={handleClick} />
        </>
      )}
    </Flex>
  );
};

// <-----------------------App----------------------------->

interface AppProps {
  collections: Collection[];
}

export default function App(/* {collections  }: AppProps */) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Container title="Dashboard - Tusk">
        <Header
          css={{
            mb: '$8',
          }}
        />
        <Main
          css={{
            w: '100%',
            maxWidth: '768px',
            m: 'auto',
          }}
        >
          <h1>loading...</h1>
        </Main>
      </Container>
    );
  }

  if (!session) {
    router.push('/');
  }

  return (
    <Container title="Dashboard - Tusk">
      <Header
        css={{
          mb: '$8',
        }}
      />
      <Main
        css={{
          w: '100%',
          maxWidth: '768px',
          m: 'auto',
        }}
      >
        <CollectionsList session={session} status={status} />
      </Main>
    </Container>
  );
}
