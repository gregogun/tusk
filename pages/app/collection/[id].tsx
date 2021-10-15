/* eslint-disable promise/always-return */
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
import { Collection, Todo } from '.prisma/client';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { CreateTodoPayload, getCollection, getTodos } from '@/lib/prisma';
// <-----------------------------Add Task----------------------------->

interface AddTaskProps {
  collection: Collection;
  updateTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: (id: number) => Promise<void>;
}

const AddTask = ({ collection, updateTodoList, fetchTodos }: AddTaskProps) => {
  const [taskName, setTaskName] = useState<string>('');
  // const [userError, setUserError] = useState(false);
  const { data: session } = useSession();

  async function handleCreateTodo(e) {
    e.preventDefault();

    const payload: CreateTodoPayload = {
      name: taskName,
      id: collection.id,
      userId: session.userId,
    };

    if (taskName !== '') {
      const res = await fetch('/api/todo', {
        body: JSON.stringify({
          payload: payload,
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

      fetchTodos(collection.id);
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
          // defaultValue={taskName}
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

// <-----------------------------Tasks----------------------------->

const ListItem = styled('li', {});

interface TaskListProps {
  collection: Collection;
  todoList: Todo[];
  fetchTodos: (id: number) => Promise<void>;
}

const TaskList = ({ collection, todoList, fetchTodos }: TaskListProps) => {
  async function handleDeleteTodo(id: number): Promise<void> {
    const res = await fetch('/api/todo', {
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    const { error } = await res.json();
    if (error) {
      console.log('replace this with toast', error);
      return;
    }

    console.log('replace with toast - successfuly deleted task!');
    fetchTodos(collection.id);
  }

  return (
    <ul>
      {todoList
        ?.map((todo) => (
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
                <Checkbox completed={todo.completed} id={todo.id} />
                <h3 className={text({ size: 'md' })}>{todo.name}</h3>
              </Flex>
              <button
                aria-label="Delete Task"
                onClick={() => handleDeleteTodo(todo.id)}
                className={button({
                  variant: 'ghost',
                  size: 'icon',
                })}
              >
                <Trash css={{ boxSize: '$lg' }} />
              </button>
            </Flex>
          </ListItem>
        ))
        .reverse()}
    </ul>
  );
};

// <-----------------------Dashboard----------------------------->

interface CollectionProps {
  todos: Todo[];
  collection: Collection;
}

export default function TodoCollection({ todos, collection }: CollectionProps) {
  const [todoList, updateTodoList] = useState<Todo[] | null>([]);

  useEffect(() => {
    fetchTodos(collection.id);
  }, []);

  async function fetchTodos(id: number): Promise<void> {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    const data = await response.json();

    console.log(data.todos);

    updateTodoList(data.todos);
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
        <AddTask collection={collection} updateTodoList={updateTodoList} fetchTodos={fetchTodos} />
        <TaskList collection={collection} todoList={todoList} fetchTodos={fetchTodos} />
      </Main>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const id = context.params.id as string;
  const todos = await getTodos(Number(id));
  const collection = await getCollection(Number(id));

  return {
    props: {
      todos,
      collection,
    },
  };
};
