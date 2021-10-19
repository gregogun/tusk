import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { name, id }: { name: string; id: string } = req.body;
  const session = await getSession({ req });

  interface CreateTodoPayload {
    name: string;
    id: string;
    userId: number;
  }

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
              id: id,
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
