/* eslint-disable react/jsx-no-bind */
/* eslint-disable promise/always-return */
import React, { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Box, Flex, Main } from '@/components/layout';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Session } from 'next-auth';
import { text } from '@/components/text';
import { button } from '@/components/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogWrapper,
} from '@/components/dialog';
import { styled } from 'stitches.config';
import { link } from '@/components/link';
import useSWR, { useSWRConfig } from 'swr';
import { fetcherSWR } from '@/lib/fetcher';
import { Cross2Icon } from '@radix-ui/react-icons';
import { svg } from '@/styles/svg';
import useMediaQuery from '@/utils/hooks/useMediaQuery';
import { Plus } from '@/components/icons/plus';
import { Collection, Todo } from '.prisma/client';
import { blue } from '@radix-ui/colors';
import { formatDistance, parseISO, parse } from 'date-fns';
import { CircularProgress } from '@/components/circularProgress';

const ListItem = styled('li', {});

interface DialogProps {
  collections: Collection[];
  handleClick: () => Promise<void>;
  setCollectionName: React.Dispatch<React.SetStateAction<string>>;
}

const Dialog = ({ collections, setCollectionName, handleClick }: DialogProps) => {
  const isLarge = useMediaQuery('(min-width: 992px)');
  return (
    <DialogWrapper>
      <DialogTrigger asChild>
        <button
          className={button({
            variant: 'brandOutline',
            size: isLarge ? 'lg' : 'icon',
            css: { display: 'block' },
          })}
        >
          {isLarge ? (
            <span>Add {collections ? `a` : `your first`} collection</span>
          ) : (
            <span>
              <Plus css={{ boxSize: '$lg' }} />
            </span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle asChild>
          <h2 className={text({ size: 'xl' })}>Add a collection</h2>
        </DialogTitle>
        <DialogDescription asChild>
          <p className={text({ size: 'md' })}>Create a collection to give better context to your tasks.</p>
        </DialogDescription>
        <Fieldset>
          <Label htmlFor="collection">Name</Label>
          <Input onChange={(e) => setCollectionName(e.target.value)} id="collection" placeholder="My Collection" />
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
          <DialogClose asChild>
            <button
              aria-label="Close"
              onClick={handleClick}
              className={button({ variant: 'brandOutline', size: 'md', css: { mr: '$4' } })}
            >
              Create
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button aria-label="Close" className={button({ variant: 'outline', size: 'md', css: {} })}>
              Cancel
            </button>
          </DialogClose>
        </Flex>
        <DialogClose asChild>
          <button
            className={button({
              size: 'icon',
              css: {
                position: 'absolute',
                top: 20,
                right: 20,
              },
            })}
          >
            <Cross2Icon
              className={svg({
                css: {
                  boxSize: '$lg',
                },
              })}
            />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogWrapper>
  );
};

// <------------------CollectionsList------------------------>

const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
});

const Label = styled('label', {
  ...text,
});

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  flex: '1',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  fontSize: 15,
  lineHeight: 1,
  color: '$white',
  boxShadow: `0 0 0 1px $colors$white`,
  height: 35,

  '&:focus': { boxShadow: `0 0 0 2px $colors$white` },
});

interface CollectionsListProps {
  session: Session;
  status: 'authenticated' | 'loading' | 'unauthenticated';
}

interface ToastState {
  state: 'success' | 'error' | 'idle';
  message: string;
}

interface CollectionWithTodos extends Collection {
  todos: Todo[];
}

interface CollectionResponse {
  collections?: CollectionWithTodos[];
}

const CollectionsList = ({ session, status }: CollectionsListProps) => {
  const [collectionName, setCollectionName] = useState('');
  const [toastAlert, setToastAlert] = useState<ToastState>({ state: 'idle', message: '' });
  const { data, error } = useSWR<CollectionResponse | undefined>('/api/collections', fetcherSWR);
  const { mutate } = useSWRConfig();

  const currentDate = new Date();

  async function handleClick() {
    if (collectionName !== '') {
      const res = await fetch(`/api/collection/${session.userId}`, {
        body: JSON.stringify({
          name: collectionName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      mutate('/api/collections');

      const { error } = await res.json();
      if (error) {
        setToastAlert({ state: 'error', message: error });
        return;
      }

      setToastAlert({
        state: 'success',
        message: 'Collection successfully created!',
      });
    } else {
      console.log('Please enter a name for your collection');
    }
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session && status !== 'loading') {
    return <h1>You are not authenticated. Please sign in.</h1>;
  }

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box css={{ p: '$4' }}>
      <Flex css={{ justifyContent: 'space-between', mb: '$8', alignItems: 'center' }}>
        <h1 className={text({ size: '3xl', css: { textAlign: 'center' } })}>
          {data?.collections.length > 0 ? `Collections` : `You have no collections`}
        </h1>
        <Dialog collections={data?.collections} setCollectionName={setCollectionName} handleClick={handleClick} />
      </Flex>
      {data?.collections.length > 0 && (
        <ul>
          <Flex
            css={{
              '@bp1': {
                flexDirection: 'column',
              },
              '@bp2': {
                flexDirection: 'row',
              },
              gap: '$6',
              width: '100%',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {data.collections?.map((collection) => (
              <ListItem
                css={{
                  borderRadius: '$lg',
                  boxShadow: `0 0 0 4px $colors$darkGray`,
                  position: 'relative',
                  width: '100%',
                  maxWidth: '350px',
                  minHeight: '300px',
                  maxHeight: '300px',
                  color: '$white',
                }}
                key={collection.id}
              >
                <Flex
                  css={{
                    flexDirection: 'column',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    p: '$6',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Link href={`/app/collection/${collection.id}`} passHref>
                      <a
                        className={link({
                          type: 'ghost',
                        })}
                      >
                        <h3 className={text({ size: '2xl', weight: 'bold', css: { mb: '$4' } })}>{collection.name}</h3>
                      </a>
                    </Link>
                    <p className={text({ size: 'lg' })}>
                      {formatDistance(parseISO(collection?.createdAt.toString()), currentDate, { addSuffix: true })}
                    </p>
                  </Box>
                  <Flex css={{ justifyContent: 'space-between', alignItems: 'end' }}>
                    <p className={text({ size: 'lg', css: { width: '50%' } })}>
                      {`${collection.todos.filter((t) => t.completed).length} of ${collection.todos.length} `} completed
                    </p>
                    <CircularProgress
                      primaryColor="var(--colors-white)"
                      secondaryColor="var(--colors-darkGray)"
                      percentage={(collection.todos.filter((t) => t.completed).length / collection.todos.length) * 100}
                      // css={{ backgroundColor: '$lightGray' }}
                    />
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </Flex>
        </ul>
      )}
    </Box>
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
            maxWidth: '100%',
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
          width: '100%',
        }}
      />
      <Main
        css={{
          '@bp1': {
            minWidth: '350px',
          },
          '@bp2': {
            minWidth: '768px',
          },
          '@bp3': {
            minWidth: '768px',
          },
          w: '100%',
          maxWidth: '768px',
          marginBottom: 'auto',
        }}
      >
        <CollectionsList session={session} status={status} />
      </Main>
    </Container>
  );
}
