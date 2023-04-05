import config from '@/config/config';
import clientPromise from '@/helpers/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  const client = await clientPromise;
  const db = client.db(config.dbName);

  switch (method) {
    case 'POST':
      console.log(`inserting email: ${body.email}`);
      await db.collection('emails').insertOne({ email: body.email });
      res.status(201).json({ email: body.email });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
