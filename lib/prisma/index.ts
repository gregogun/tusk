/* eslint-disable import/no-mutable-exports */
import { PrismaClient } from '@prisma/client';
import { Collection } from '.prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// export async function getCollections(id: number | unknown): Promise<Collection[]> {
//   const collections = await prisma.collection
//     .findMany({
//       where: {
//         userId: id,
//       },
//     })
//     .catch((error) => error);

//   return collections;
// }

export interface CollectionPayload {
  name: string;
  id: number;
}

export interface CreateTodoPayload {
  name: string;
  id: string;
  userId: number;
}

export async function getCollection(id: string): Promise<Collection> {
  const collection = await prisma.collection
    .findUnique({
      where: {
        id: id,
      },
      include: {
        todos: true,
      },
    })
    .catch((error) => error);

  return collection;
}

export default prisma;
