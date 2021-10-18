import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(async (resolve) => {
    const { method } = req;
    const id = req.query.id as string;
    const session = await getSession({ req });

    switch (method) {
      case 'GET':
        handleGet();
        return;
      case 'POST':
        handlePost();
        return;
      case 'PUT':
        handlePut();
        return;
      case 'DELETE':
        handleDelete();
        return;
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }

    interface CreateTodoPayload {
      name: string;
      id: string;
      userId: number;
    }

    // READ/GET a todo
    async function handleGet() {
      try {
        const todo = await prisma.todo.findUnique({
          where: {
            id: id,
          },
        });
        return res.status(200).json({ todo });
      } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
      }
    }

    async function handlePost() {
      const { name, collectionId }: { name: string; collectionId: string } = req.body;

      try {
        const newTodo = await prisma.todo.create({
          data: {
            name: name,
            collection: {
              connectOrCreate: {
                create: {
                  name: name,
                  userId: session.userId,
                },
                where: {
                  id: collectionId,
                },
              },
            },
          },
        });
        return res.status(201).json({ newTodo });
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong! Please try again.' });
      }
    }

    async function handlePut() {
      const { name, completed } = req.body;

      if (name) {
        try {
          await prisma.todo.update({
            where: {
              id: id,
            },
            data: {
              name: name,
            },
          });
          return res.status(204);
        } catch (error) {
          return res.status(500).json({ error: error.message || error.toString() });
        }
      }

      try {
        await prisma.todo.update({
          where: {
            id: id,
          },
          data: {
            completed: completed,
          },
        });
        res.status(204);
      } catch (error) {
        res.status(500).json({ error: error.message || error.toString() });
      }
    }

    async function handleDelete() {
      try {
        const todo = await prisma.todo.delete({
          where: {
            id,
          },
        });
        return res.status(200).json({ todo });
      } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
      }
    }

    resolve();
  });
}
