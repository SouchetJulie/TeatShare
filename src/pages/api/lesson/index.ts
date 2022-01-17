import {NextApiRequest, NextApiResponse} from 'next';
import {notImplementedHandler} from '@common/not-implemented.handler';
import {lessonGetAllHandler} from '@handlers/lesson/get.handler';
import {lessonPostHandler} from '@handlers/lesson/post.handler';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const handlers = {
        'GET': lessonGetAllHandler,
        'POST': lessonPostHandler
        // add here handlers for other methods
    };

    const handler = handlers[req.method] || notImplementedHandler;

    await handler(req, res);
};
