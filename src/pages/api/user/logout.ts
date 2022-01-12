import {NextApiRequest, NextApiResponse} from 'next';
import {defaultHandler} from '@common/default.handler';
import {logoutHandler} from '@handlers/user/logout/logout.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        'GET': logoutHandler,
        'POST': logoutHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || defaultHandler;

    await handler(req, res);
};
