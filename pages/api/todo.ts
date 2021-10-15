import { createTodo, deleteTodo, getTodo } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req;

  switch (method) {
    case 'POST':
      handlePost();
      break;
    case 'GET':
      handleGet();
      break;
    case 'PUT':
      console.log('add update func here');
      break;
    case 'DELETE':
      handleDelete();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }

  // CREATE a todo
  async function handlePost() {
    const { payload } = req.body;

    if (payload) {
      try {
        const response = await createTodo(payload);
        return res.status(201).json({ response });
      } catch (error) {
        return res.status(500).json({ error: 'Something went wrong! Please try again.' });
      }
    }
  }

  // READ/GET a todo
  async function handleGet() {
    const { id } = req.body;

    try {
      const collection = await getTodo(id);
      res.status(200).json({ collection });
    } catch (error) {
      res.status(500).json({ error: error.message || error.toString() });
    }
  }

  // DELETE a todo
  async function handleDelete() {
    const { id } = req.body;

    try {
      const response = await deleteTodo(id);
      return res.status(200).json({ response });
    } catch (error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  }
}
