import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '../../../server/common/not-implemented.handler';
import {userGetHandler} from '../../../server/handlers/user/get.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        "GET": userGetHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    handler(req, res);
};
