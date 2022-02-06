import {NextApiRequest, NextApiResponse} from 'next';
import {loginHandler} from '@handlers/user/login/login.handler';
import routerMiddleware from "@middlewares/router.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    'POST': loginHandler,
    // add here handlers for other methods
  }

  await routerMiddleware(handlers, req.method)(req, res);
};
