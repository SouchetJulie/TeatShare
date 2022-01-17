import {NextApiResponse} from 'next';
import {notImplementedHandler} from "@common/not-implemented.handler";
import {logoutHandler} from '@handlers/user/logout/logout.handler';
import {ISessionApiRequest} from '@typing/session-api-request.interface';

export default async (req: ISessionApiRequest, res: NextApiResponse) => {
    const handlers = {
        'GET': logoutHandler,
        'POST': logoutHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    await handler(req, res);
};
