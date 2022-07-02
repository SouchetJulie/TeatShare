import { lessonPostHandler } from "@handlers/lesson/create.handler";
import { lessonGetAllHandler } from "@handlers/lesson/get.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// Disable the default body parser
export const config = {
  api: {
    externalResolver: true, // for `connect` middlewares
    bodyParser: false, // for file upload
  },
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    GET: lessonGetAllHandler,
    POST: lessonPostHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
