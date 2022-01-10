import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '../../../server/common/not-implemented.handler';
import {lessonGetAllHandler} from '../../../server/handlers/lesson/get.handler';
import {lessonPostHandler} from '../../../server/handlers/lesson/post.handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        "GET": lessonGetAllHandler,
        "POST": lessonPostHandler
        // add here handlers for other methods
    }

    const handler = handlers[req.method] || notImplementedHandler;

    handler(req, res);
};
