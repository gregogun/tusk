import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'User is unauthorized' });
  }

  try {
    const collections = await prisma.collection
      .findMany({
        where: {
          userId: session.userId,
        },
        include: {
          todos: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      .catch((error) => error);
    res.status(200).json({ collections });
  } catch (error) {
    res.status(500).json({ error: error.message || error.toString() });
  }
}

export default handler;
