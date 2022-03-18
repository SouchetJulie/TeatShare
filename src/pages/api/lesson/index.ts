import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { lessonGetAllHandler } from "@handlers/lesson/get.handler";
import { lessonPostHandler } from "@handlers/lesson/post.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";

// Disable the default body parser
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const handlers: Record<string, NextApiHandler> = {
    GET: lessonGetAllHandler,
    POST: lessonPostHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
