import { userGetAllBookmarksHandler } from "@handlers/user/bookmark/get.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    GET: userGetAllBookmarksHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
