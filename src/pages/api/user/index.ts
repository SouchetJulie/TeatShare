import { NextApiRequest, NextApiResponse } from 'next';
import { defaultHandler } from '../../../server/common/default.handler';
import { userGetHandler } from '../../../server/handlers/user/get.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    "GET": userGetHandler,
    // add here handlers for other methods
  }

  const handler = handlers[req.method] || defaultHandler;

  handler(req, res);
};
