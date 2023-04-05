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
      newComment._id = result.insertedId;

      res.status(201).json(newComment);
      break;
    case 'GET':
      console.log(`Retrieving all comments for eventId: ${eventId}`);

      const comments = await db
        .collection('comments')
        .find({ eventId })
        .sort({ _id: -1 })
        .toArray();

      res.status(200).json(comments);
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
