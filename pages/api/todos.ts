import { Collection, Todo } from '.prisma/client';
import { getCollections, getTodos } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.body;

  try {
    const todos: Todo[] = await getTodos(id);

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message || error.toString() });
  }
}
