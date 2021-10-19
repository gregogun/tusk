import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return new Promise(async (resolve) => {
    const { method } = req;
    const id = req.query.id as string;
    const session = await getSession({ req });

    switch (method) {
      case 'POST':
        handlePost();
        return;
      case 'GET':
        handleGet();
        return;
      case 'PUT':
        handlePut();
        return;
      case 'DELETE':
        handleDelete();
        return;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }

    // CREATE a collection
    async function handlePost() {
      const { name } = req.body;

      if (name) {
        try {
          const collection = await prisma.collection
            .create({
              data: {
                name: name,
                user: {
                  connect: {
                    id: session.userId,
                  },
                },
              },
            })
            .catch((error) => error);
          return res.status(201).json({ collection });
        } catch (error) {
          return res.status(500).json({ error: 'Something went wrong! Please try again.' });
        }
      }
    }

    // READ/GET a collection
    async function handleGet() {
      try {
        const collection = await prisma.collection.findUnique({
          where: {
            id: id,
          },
        });
        res.status(200).json({ collection });
      } catch (error) {
        res.status(500).json({ error: error.message || error.toString() });
      }
    }

    async function handlePut() {
      const { name } = req.body;
      console.log('running update');

      try {
        await prisma.collection
          .update({
            data: {
              name: name,
            },
            where: {
              id: id,
            },
          })
          .catch((error) => console.log(error));
        return res.status(204);
      } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
      }
    }

    async function handleDelete() {
      console.log('reached delete');

      try {
        await prisma.todo
          .deleteMany({
            where: {
              collectionId: id,
            },
          })
          .then(
            async () =>
              await prisma.collection.delete({
                where: {
                  id: id,
                },
              })
          );
        return res.status(200).json({ message: 'successfully deleted' });
      } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
      }
    }
    resolve();
  });
}
