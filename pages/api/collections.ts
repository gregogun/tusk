import { Collection } from '.prisma/client';
import { getCollections } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  // const { id } = req.body;
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'User is unauthorized' });
  }

  console.log(session);

  try {
    const collections: Collection[] = await getCollections(session.userId);
    // console.log(collections);

    res.status(200).json({ collections });
  } catch (error) {
    res.status(500).json({ error: error.message || error.toString() });
  }
}
