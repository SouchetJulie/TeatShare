import { NextApiResponse } from 'next';
import { defaultHandler } from '@common/default.handler';
import { ISessionApiRequest } from '@typing/session-api-request.interface';
import { logoutPostHandler } from '@handlers/user/logout/post.handler';

export default async (req: ISessionApiRequest, res: NextApiResponse) => {
  const handlers = {
    'POST': logoutPostHandler,
    // add here handlers for other methods
  }

  const handler = handlers[req.method] || defaultHandler;

  await handler(req, res);
};
