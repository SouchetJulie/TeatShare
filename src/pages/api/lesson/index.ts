import { NextApiRequest, NextApiResponse } from 'next';
import { defaultHandler } from '../../../server/common/default.handler';
import { lessonGetHandler } from '../../../server/handlers/lesson/get.handler';
import { lessonPostHandler } from '../../../server/handlers/lesson/post.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    "GET": lessonGetHandler,
    "POST": lessonPostHandler
    // add here handlers for other methods
  }

  const handler = handlers[req.method] || defaultHandler;

  handler(req, res);
};
