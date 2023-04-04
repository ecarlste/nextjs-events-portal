import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, query, method } = req;

  const eventId = query.eventId;

  switch (method) {
    case 'POST':
      const { email, name, text } = body;

      const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text,
      };

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
