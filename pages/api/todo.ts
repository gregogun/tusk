import { createTodo, getTodo } from '@/lib/prisma';
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
    case 'DELETE ':
      console.log('add delete func here');
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT,', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }

  // CREATE a collection
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

  // READ/GET a collection
  async function handleGet() {
    const { id } = req.body;

    try {
      const collection = await getTodo(id);
      res.status(200).json({ collection });
    } catch (error) {
      res.status(500).json({ error: error.message || error.toString() });
    }
  }
}
