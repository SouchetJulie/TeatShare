import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '../../../server/common/not-implemented.handler';
import {signupPostHandler} from '../../../server/handlers/user/signup/post.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        "POST": signupPostHandler,
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    handler(req, res);
};


