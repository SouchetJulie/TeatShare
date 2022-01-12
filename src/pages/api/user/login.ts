import {NextApiRequest, NextApiResponse} from 'next';
import {defaultHandler} from '@common/default.handler';
import {loginHandler} from '@handlers/user/login/login.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        'POST': loginHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || defaultHandler;

    await handler(req, res);
};
