/* eslint-disable import/no-mutable-exports */
import { PrismaClient } from '@prisma/client';
import { Collection, Todo } from '.prisma/client';

export let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export async function getCollections(id: number | unknown): Promise<Collection[]> {
  const collections = await prisma.collection
    .findMany({
      where: {
        userId: id,
      },
    })
    .catch((error) => error);

  return collections;
}

export interface CollectionPayload {
  name: string;
  id: number;
}
export async function getCollection(id: number): Promise<Collection> {
  const collection = await prisma.collection
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((error) => error);

  return collection;
}

export interface CollectionPayload {
  name: string;
  id: number;
}

export async function createCollection(payload: CollectionPayload) {
  const { name, id } = payload;
  const newCollection = await prisma.collection
    .create({
      data: {
        name: name,
        user: {
          connect: {
            id: id,
          },
        },
      },
    })
    .catch((error) => error);
  // console.log(newCollection);
  return newCollection;
}

export async function getTodos(id: number): Promise<Todo[]> {
  const todos = await prisma.todo
    .findMany({
      where: {
        collectionId: id,
      },
    })
    .catch((error) => error);
  //console.log(todos);

  return todos;
}

export async function getTodo(id: number) {
  const todo = await prisma.todo
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((error) => error);

  return todo;
}

export interface CreateTodoPayload {
  name: string;
  id: number;
  userId: number;
}

export async function createTodo({ name, id, userId }: CreateTodoPayload) {
  const createTodo = await prisma.todo
    .create({
      data: {
        name: name,
        collection: {
          connectOrCreate: {
            create: {
              name: name,
              userId: userId,
            },
            where: {
              id: id,
            },
          },
        },
      },
      include: {
        collection: true,
      },
    })
    .catch((error) => error);
  console.log(createTodo);
  return createTodo;
}

export async function deleteTodo(id: number) {
  const deleteTodo = await prisma.todo
    .delete({
      where: {
        id: id,
      },
    })
    .catch((error) => error);
  console.log(deleteTodo);
  return deleteTodo;
}
