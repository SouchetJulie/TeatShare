import {NextApiRequest, NextApiResponse} from 'next';
import {signupHandler} from '@handlers/user/signup/signup.handler';
import routerMiddleware from "@middlewares/router.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    'POST': signupHandler,
    // add here handlers for other methods
  }

  await routerMiddleware(handlers, req.method)(req, res);
};


