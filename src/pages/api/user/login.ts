import { NextApiResponse} from 'next';
import {notImplementedHandler} from '@common/not-implemented.handler';
import {loginHandler} from '@handlers/user/login/login.handler';
import { ISessionApiRequest } from '@typing/session-api-request.interface';

export default async (req: ISessionApiRequest, res: NextApiResponse) => {
    const handlers = {
        'POST': loginHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    await handler(req, res);
};
