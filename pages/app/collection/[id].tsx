import React, { useEffect, useState } from 'react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { button } from '@/components/button';
import { Box, Flex, Main } from '@/components/layout';
import { text } from '@/components/text';
import { Plus } from '@/components/icons/plus';
import { srOnly } from '@/styles/srOnly';
import { Input } from '@/components/input';
import { styled } from 'stitches.config';
import { Checkbox } from '@/components/checkbox';
import { Trash } from '@/components/icons/trash';
import { useRouter } from 'next/router';
import { Collection, Todo } from '.prisma/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getCollection, getCollections, getTodos } from '@/lib/prisma';
import { Params } from 'next/dist/server/router';
import { server } from 'config';

// <-----------------------------Add Task----------------------------->

const AddTask = () => {
  const [task, setTask] = useState<string>('');
  // const [userError, setUserError] = useState(false);

  async function handleCreateTodo(e) {
    e.preventDefault();
    //
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
            boxShadow: '0 0 0 2px $colors$gray',
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
          css={{ width: '100%' }}
          defaultValue={task}
          onChange={(e) => setTask(e.target.value)}
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

// <-----------------------------Tasks----------------------------->

const ListItem = styled('li', {});

interface TaskProps {
  todo: Todo;
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = ({ complete, setComplete, todo }: TaskProps) => {
  async function handleDeleteTodo(): Promise<void> {
    //
  }

  return (
    <ListItem
      css={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        padding: '$3',
        borderRadius: '$md',
        boxShadow: '0 0 0 2px $colors$accent',
        gap: '$4',
        mb: '$4',

        '&:focus-within': {
          boxShadow: '0 0 0 2px $colors$gray',
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
          <Checkbox completed={todo.completed} id={todo.id} complete={complete} setComplete={setComplete} />
          <h3 className={text({ size: 'md' })}>{todo.name}</h3>
        </Flex>
        <button
          onClick={handleDeleteTodo}
          className={button({
            variant: 'ghost',
            size: 'icon',
            css: {
              boxSize: '$md',
            },
          })}
        >
          <Trash />
        </button>
      </Flex>
    </ListItem>
  );
};

interface TaskListProps {
  todos: Todo[];
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskList = ({ complete, setComplete, todos }: TaskListProps) => {
  return (
    <ul>
      {todos?.map((todo) => (
        <Task key={todo.id} todo={todo} complete={complete} setComplete={setComplete} />
      ))}
    </ul>
  );
};

// <-----------------------Dashboard----------------------------->

interface CollectionProps {
  todos: Todo[];
  collection: Collection;
}

export default function TodoCollection({ todos, collection }: CollectionProps) {
  // const [todoList, updateTodoList] = useState<Todo[] | null>([]);
  const [complete, setComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(todos, collection);
  }, []);

  async function fetchTodos() {
    //
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
        <h1 className={text({ size: 'xl', css: { mb: '$4' } })}>Tasks - {todos.length}</h1>
        <AddTask />
        <TaskList todos={todos} complete={complete} setComplete={setComplete} />
      </Main>
    </Container>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const response = await fetch(`${server}/api/collection/getMany`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).catch((error) => {
//     console.log(error);
//   });

//   //console.log(response);

//   const collections = await response.json();

//   return {
//     paths: collections.map((collection) => ({
//       params: {
//         id: collection.id.toString(),
//       },
//     })),
//     fallback: true,
//   };
// };

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params.id as string;
  const todos = await getTodos(id);
  const collection = await getCollection(Number(id));
  console.log(context);
  // console.log(todos);

  return {
    props: {
      todos,
      collection,
    },
  };
};
