import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '../../../server/common/not-implemented.handler';
import {loginPostHandler} from '../../../server/handlers/user/login/post.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        "POST": loginPostHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    handler(req, res);
};
