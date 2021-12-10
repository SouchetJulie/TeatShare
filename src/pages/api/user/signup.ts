import { NextApiRequest, NextApiResponse } from 'next';
import { defaultHandler } from '../../../server/common/default.handler';
import { signupPostHandler } from '../../../server/handlers/user/signup/post.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    "POST": signupPostHandler,
    // add here handlers for other methods
  }

  const handler = handlers[req.method] || defaultHandler;

  handler(req, res);
};


