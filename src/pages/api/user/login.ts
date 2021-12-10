import { NextApiResponse } from 'next';
import { defaultHandler } from '@common/default.handler';
import { loginPostHandler } from '@handlers/user/login/post.handler';
import { ISessionApiRequest } from '@typing/session-api-request.interface';

export default async (req: ISessionApiRequest, res: NextApiResponse) => {
  const handlers = {
    'POST': loginPostHandler,
    // add here handlers for other methods
  }

  const handler = handlers[req.method] || defaultHandler;

  await handler(req, res);
};
