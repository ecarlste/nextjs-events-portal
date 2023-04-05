import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASS;
  const dbHost = process.env.DB_HOST;
  const dbName = process.env.DB_NAME;

  console.log(dbUser, dbPassword, dbHost, dbName);

  const client = new MongoClient(
    `mongodb+srv://nextjs-events-portal:Hl7BylTF53Rre40h@cluster0.fa20kwi.mongodb.net/`
  );

  console.log('waiting for connection');
  await client.connect();

  console.log('creating db');
  const db = client.db(dbName);

  console.log('creating collection');
  const emailsCollection = db.collection('emails');

  switch (method) {
    case 'POST':
      console.log(`email: ${body.email}`);
      await emailsCollection.insertOne({ email: body.email });
      res.status(201).json({ email: body.email });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }

  client.close();
}

export default handler;
