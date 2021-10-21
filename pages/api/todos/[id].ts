import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { withSentry } from '@sentry/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'No ID sent in request' });
  }

  const collectionId = id as string;

  try {
    const todos = await prisma.todo
      .findMany({
        where: {
          collectionId: collectionId,
        },
      })
      .catch((error) => error);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message || error.toString() });
  }
}

export default withSentry(handler);
