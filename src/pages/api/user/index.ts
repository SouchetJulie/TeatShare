import { NextApiRequest, NextApiResponse } from 'next';
import { defaultHandler } from '@common/default.handler';
import { userGetHandler } from '@handlers/user/get.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    'GET': userGetHandler,
    // add here handlers for other methods
  }

  const handler = handlers[req.method] || defaultHandler;

  await handler(req, res);
};
