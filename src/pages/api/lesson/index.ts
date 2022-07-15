import { lessonGetAllHandler } from "@handlers/lesson/get.handler";
import {
  lessonCreateHandler,
  lessonUpdateHandler,
} from "@handlers/lesson/save.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

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
    POST: lessonCreateHandler,
    PUT: lessonUpdateHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
