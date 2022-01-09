import { NextApiRequest, NextApiResponse } from 'next';
import { defaultHandler } from '@common/default.handler';
import { lessonGetHandler } from '@handlers/lesson/get.handler';
import { lessonPostHandler } from '@handlers/lesson/post.handler';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    'GET': lessonGetHandler, 'POST': lessonPostHandler
    // add here handlers for other methods
  };

  const handler = handlers[req.method] || defaultHandler;

  await handler(req, res);
};
