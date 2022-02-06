import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '@common/not-implemented.handler';
import {lessonGetAllHandler} from '@handlers/lesson/get.handler';
import {lessonPostHandler} from '@handlers/lesson/post.handler';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers: Record<string, NextApiHandler> = {
    'GET': lessonGetAllHandler,
    'POST': lessonPostHandler
    // add here handlers for other methods
  };

  const handler = (req.method ? handlers[req.method] : notImplementedHandler) || notImplementedHandler;

  await handler(req, res);
};
