import { NextApiRequest, NextApiResponse } from "next";
import { logoutHandler } from "@handlers/user/logout/logout.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const handlers = {
    POST: logoutHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
