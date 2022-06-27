import { logoutHandler } from "@handlers/user/logout/logout.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    POST: logoutHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
