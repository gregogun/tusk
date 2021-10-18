/* eslint-disable promise/always-return */
import React, { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Button, button } from '@/components/button';
import { Box, Flex, Main } from '@/components/layout';
import { text } from '@/components/text';
import { Plus } from '@/components/icons/plus';
import { srOnly } from '@/styles/srOnly';
import { Input } from '@/components/input';
import { css, styled } from 'stitches.config';
import { CheckboxIndicator, StyledCheckbox } from '@/components/checkbox';
import { Trash } from '@/components/icons/trash';
import { Collection, Todo } from '.prisma/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { CreateTodoPayload, getCollection } from '@/lib/prisma';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  itemStyles,
} from '@/components/dropdown';
import { EllipsisVertical } from '@/components/icons/ellipsis_vertical';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alertDialog';
import { Pencil } from '@/components/icons/pencil';
import { green, red } from '@radix-ui/colors';
import { Session } from 'next-auth';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import useSWR, { mutate, useSWRConfig } from 'swr';
import { fetcher, fetcherSWR } from '@/lib/fetcher';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFieldset,
  DialogInput,
  DialogLabel,
  DialogTitle,
  DialogTrigger,
  DialogWrapper,
} from '@/components/dialog';
import { CheckIcon, ChevronLeftIcon, Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { svg } from '@/styles/svg';
import Link from 'next/link';

// <-----------------------------Add Task----------------------------->

interface AddTaskProps {
  collection: Collection;
  session: Session;
}

const AddTask = ({ session, collection }: AddTaskProps) => {
  const [taskName, setTaskName] = useState<string>('');
  const { mutate } = useSWRConfig();

  async function handleCreateTodo(e) {
    e.preventDefault();

    if (taskName !== '') {
      const res = await fetch(`/api/todo/${collection.id}`, {
        body: JSON.stringify({
          name: taskName,
          collectionId: collection?.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      setTaskName('');

      const { error } = await res.json();
      if (error) {
        console.log('replace with toast alert', error);
        return;
      }

      // mutate('/api/todos');
    }
  }

  return (
    <form onSubmit={handleCreateTodo}>
      <Box
        css={{
          m: 'auto',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 0 0 1px $colors$gray',
          padding: '$3',
          borderRadius: '$md',
          gap: '$4',
          mb: '$6',

          '&:focus-within': {
            boxShadow: '0 0 0 2px $colors$lightGray',
          },
        }}
        role="group"
      >
        <button type="submit" className={button({ variant: 'brandOutline', size: 'icon' })}>
          <Plus
            css={{
              boxSize: '$md',
            }}
          />
        </button>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={srOnly()} htmlFor="task" id="task-label">
          Add a task
        </label>
        <Input
          css={{ width: '100%', outline: 'none', '&:hover': { boxShadow: '0' } }}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          variant="text"
          type="text"
          name="task"
          id="task"
          placeholder="Add a task"
        />
      </Box>
    </form>
  );
};

const Label = styled('label', {
  ...srOnly,
});

const icon = css({});

interface CheckboxProps {
  todo: Todo;
}

const Checkbox = ({ todo }: CheckboxProps) => {
  const [completed, setCompleted] = useState(todo?.completed);

  useEffect(() => {
    console.log(completed);
  }, [completed]);

  async function handleTestClick() {
    // await fetcher(`/api/test`, { completed: !completed }, 'POST');
    setCompleted(!completed);
    await fetcher(`/api/todo/${todo.id}`, { completed: !completed }, 'PUT');
    // await mutate('/api/todos');
  }

  return (
    <Flex css={{ alignItems: 'center' }}>
      <StyledCheckbox
        onClick={handleTestClick}
        checked={completed}
        id="c1"
        css={{
          backgroundColor: completed ? green.green9 : '',
          '&:hover': {
            backgroundColor: completed ? green.green11 : '',
          },
        }}
      >
        <CheckboxIndicator>
          {completed ? (
            <CheckIcon
              className={icon({
                css: {
                  boxSize: '$lg',
                },
              })}
            />
          ) : null}
        </CheckboxIndicator>
      </StyledCheckbox>
      <Label css={{ paddingLeft: '$4' }} htmlFor="c1">
        Set {todo.name} as {completed ? `incomplete` : `complete`}
      </Label>
    </Flex>
  );
};

const Task = ({ collection, todo }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, updateName] = useState('');
  const { mutate } = useSWRConfig();

  return (
    <ListItem
      key={todo.id}
      css={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '$3',
        borderRadius: '$md',
        boxShadow: '0 0 0 2px $colors$gray',
        gap: '$4',
        mb: '$6',

        '&:focus-within': {
          boxShadow: '0 0 0 2px $colors$lightGray',
        },
      }}
    >
      <Flex
        css={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Flex css={{ alignItems: 'center' }}>
          <Checkbox todo={todo} />
          <h3 className={text({ size: 'md' })}>{todo.name}</h3>
        </Flex>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={button({
                variant: 'ghost',
                size: 'icon',
              })}
            >
              <EllipsisVertical css={{ boxSize: '$lg' }} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              role="button"
              onSelect={(e) => e.preventDefault()}
              onClick={() => setEditOpen(!editOpen)}
              css={{
                padding: '$3',
                borderRadius: '$md $md 0 0',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              Edit{' '}
              <span>
                <Pencil css={{ boxSize: '$md' }} />
              </span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            DIALOG GOES BACK IN HERE
          </DropdownMenuItem> */}
            <DropdownMenuItem
              role="button"
              onClick={() => setDeleteOpen(!deleteOpen)}
              css={{
                padding: '$3',
                borderRadius: '0 0 $md $md',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              onSelect={(e) => e.preventDefault()}
            >
              Delete
              <span>
                <Trash css={{ boxSize: '$md' }} />
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertDialog open={deleteOpen} onOpenChange={() => setDeleteOpen(!deleteOpen)}>
                <AlertDialogContent>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this task and remove its data from our
                    servers.
                  </AlertDialogDescription>
                  <Flex css={{ justifyContent: 'center', gap: '$4' }}>
                    <AlertDialogCancel asChild>
                      <button className={button({ variant: 'outline' })}>Cancel</button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <button
                        className={button({
                          variant: 'solid',
                          css: {
                            backgroundColor: red.red3,
                            color: red.red11,
                            '&:hover': { backgroundColor: red.red5 },
                          },
                        })}
                        onClick={async () => {
                          await fetcher(`/api/todo/${todo.id}`, { id: todo.id }, 'DELETE');
                        }}
                      >
                        Yes, delete task
                      </button>
                    </AlertDialogAction>
                  </Flex>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogWrapper open={editOpen} onOpenChange={() => setEditOpen(!editOpen)}>
          <DialogContent>
            <DialogTitle asChild>
              <h2>Edit Task</h2>
            </DialogTitle>
            <DialogDescription asChild>
              <p>Rename your task and hit the save button below to save changes.</p>
            </DialogDescription>
            <DialogFieldset>
              <DialogLabel htmlFor="task">Name</DialogLabel>
              <DialogInput onChange={(e) => updateName(e.target.value)} id="task" placeholder="My Task" />
            </DialogFieldset>
            <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
              <DialogClose asChild>
                <button
                  aria-label="Close"
                  onClick={async () => {
                    // await fetcher(`/api/test`, { name: name, id: todo.id }, 'POST');
                    await fetcher(`/api/todo/${todo.id}`, { name: name }, 'PUT');
                    await mutate('/api/todos');
                  }}
                  className={button({
                    variant: 'brandOutline',
                    size: 'md',
                    css: { mr: '$4', backgroundColor: '$darkGray' },
                  })}
                >
                  Save
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
      </Flex>
    </ListItem>
  );
};

// <-----------------------------Tasks----------------------------->

const ListItem = styled('li', {});

interface TaskListProps {
  collection: Collection;
  todos: Todo[];
}

const CompleteTasks = ({ collection, todos }: TaskListProps) => {
  return (
    <ul>
      {todos
        ?.filter((todo) => todo.completed)
        .map((completeTodo) => (
          <Task key={completeTodo.id} todo={completeTodo} collection={collection} />
        ))}
    </ul>
  );
};

const IncompleteTasks = ({ collection, todos }: TaskListProps) => {
  return (
    <ul>
      {todos
        ?.filter((todo) => !todo.completed)
        .map((incompleteTodo) => (
          <Task key={incompleteTodo.id} todo={incompleteTodo} collection={collection} />
        ))}
    </ul>
  );
};

// <-----------------------Collection----------------------------->

const CollectionDialog = ({ collection }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, updateName] = useState(collection?.name);
  const { mutate } = useSWRConfig();
  const router = useRouter();

  return (
    <Flex css={{ mb: '$6', alignItems: 'center', justifyContent: 'space-between' }}>
      <Flex css={{ alignItems: 'center' }}>
        <Link href="/app" passHref>
          <a
            className={button({
              size: 'icon',
              css: {
                padding: '$2 $2',
                mr: '$4',
                backgroundColor: '$darkGray',
                '&:hover': {
                  backgroundColor: '$gray',
                },
              },
            })}
          >
            <ChevronLeftIcon aria-label="Back to collections" className={svg({ css: { boxSize: '$2xl' } })} />
          </a>
        </Link>
        <h1 className={text({ size: '2xl', weight: 'bold' })}>{name}</h1>
      </Flex>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={button({
              variant: 'ghost',
              size: 'icon',
            })}
          >
            <DotsHorizontalIcon className={svg({ css: { boxSize: '$lg' } })} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            role="button"
            onSelect={(e) => e.preventDefault()}
            onClick={() => setEditOpen(!editOpen)}
            css={{
              padding: '$3',
              borderRadius: '$md $md 0 0',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            Edit{' '}
            <span>
              <Pencil css={{ boxSize: '$md' }} />
            </span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            DIALOG GOES BACK IN HERE
          </DropdownMenuItem> */}
          <DropdownMenuItem
            role="button"
            onClick={() => setDeleteOpen(!deleteOpen)}
            css={{
              padding: '$3',
              borderRadius: '0 0 $md $md',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onSelect={(e) => e.preventDefault()}
          >
            Delete
            <span>
              <Trash css={{ boxSize: '$md' }} />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <AlertDialog open={deleteOpen} onOpenChange={() => setDeleteOpen(!deleteOpen)}>
              <AlertDialogContent>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this collection and{' '}
                  <span className={text({ weight: 'bold', css: { color: '$white' } })}>all of its tasks</span>.
                </AlertDialogDescription>
                <Flex css={{ justifyContent: 'center', gap: '$4' }}>
                  <AlertDialogCancel asChild>
                    <button className={button({ variant: 'outline' })}>Cancel</button>
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <button
                      className={button({
                        variant: 'solid',
                        css: {
                          backgroundColor: red.red3,
                          color: red.red11,
                          '&:hover': { backgroundColor: red.red5 },
                        },
                      })}
                      onClick={async () => {
                        await fetcher(`/api/collection/${collection.id}`, { id: collection.id }, 'DELETE').then(() => {
                          router.push('/app');
                        });
                      }}
                    >
                      Yes, delete task
                    </button>
                  </AlertDialogAction>
                </Flex>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogWrapper open={editOpen} onOpenChange={() => setEditOpen(!editOpen)}>
        <DialogContent>
          <DialogTitle asChild>
            <h2>Edit Task</h2>
          </DialogTitle>
          <DialogDescription asChild>
            <p>Rename your task and hit the save button below to save changes.</p>
          </DialogDescription>
          <DialogFieldset>
            <DialogLabel htmlFor="collection">Name</DialogLabel>
            <DialogInput onChange={(e) => updateName(e.target.value)} id="collection" placeholder="My Collection" />
          </DialogFieldset>
          <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
            <DialogClose asChild>
              <button
                aria-label="Close"
                onClick={async () => {
                  // await fetcher(`/api/test`, { name: name, id: collection.id }, 'POST');
                  await fetcher(`/api/collection/${collection.id}`, { name: name }, 'PUT');
                  await mutate('/api/collections');
                }}
                className={button({
                  variant: 'brandOutline',
                  size: 'md',
                  css: { mr: '$4', backgroundColor: '$darkGray' },
                })}
              >
                Save
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
    </Flex>
  );
};

// <-----------------------Dashboard----------------------------->

interface CollectionProps {
  todos: Todo[];
  collection: Collection;
}

interface TodoResponse {
  todos?: Todo[];
}

export default function TodoCollection({ todos, collection }: CollectionProps) {
  const { data: session, status } = useSession();
  const { data, error } = useSWR<TodoResponse | undefined>(`/api/todos/${collection.id}`, fetcherSWR, {
    refreshInterval: 1000,
  });
  const router = useRouter();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && status === 'loading') return null;

  if (!session && status !== 'loading') {
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
            p: '$4',
          },
          w: '100%',
          maxWidth: '768px',
          m: 'auto',
        }}
      >
        <CollectionDialog collection={collection} />
        <h2 className={text({ size: 'xl', css: { mb: '$4' } })}>
          Tasks - {data?.todos?.filter((todo) => !todo.completed).length}
        </h2>
        <AddTask session={session} collection={collection} />
        <IncompleteTasks collection={collection} todos={data?.todos} />
        <h2 className={text({ size: 'xl', css: { mb: '$4' } })}>
          Completed - {data?.todos?.filter((todo) => todo.completed).length}
        </h2>
        <CompleteTasks collection={collection} todos={data?.todos} />
      </Main>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params.id as string;
  const collection = await getCollection(id);

  if (context.params.id !== collection?.id) {
    return {
      notFound: true,
    };
  }

  // console.log(collection);

  return {
    props: {
      collection,
    },
  };
};
