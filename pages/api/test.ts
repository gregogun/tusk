import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { name, completed, id } = req.body;

  if (name && id) {
    console.log(name, id);
    return res.status(200).json({ message: 'name received' });
  }

  console.log(completed);
  res.status(200).json({ message: 'completed received' });
}
