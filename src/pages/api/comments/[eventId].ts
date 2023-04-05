import config from '@/config/config';
import clientPromise from '@/helpers/mongodb';
import Comment from '@/models/comment';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, query, method } = req;

  const client = await clientPromise;
  const db = client.db(config.dbName);

  const eventId = query.eventId as string;

  switch (method) {
    case 'POST':
      const { email, name, text } = body;

      const newComment: Comment = {
        email,
        name,
        text,
        eventId,
      };

      console.log(`inserting comment: ${JSON.stringify(newComment, null, 2)}`);
      const result = await db.collection('comments').insertOne(newComment);
      newComment.id = result.insertedId.toString();

      console.log(result);

      res.status(201).json(newComment);
      break;
    case 'GET':
      const comments = [
        { id: 'c1', name: 'Max', text: 'Some text here...' },
        { id: 'c2', name: 'Manuel', text: 'Some more text here...' },
      ];

      res.status(200).json(comments);
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
