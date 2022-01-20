import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '@common/not-implemented.handler';
import {userGetAllHandler} from '@handlers/user/get.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        'GET': userGetAllHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    await handler(req, res);
};
