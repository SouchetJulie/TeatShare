import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '@common/not-implemented.handler';
import {signupHandler} from '@handlers/user/signup/signup.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        'POST': signupHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    await handler(req, res);
};


