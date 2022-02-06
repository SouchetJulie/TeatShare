import { NextApiRequest, NextApiResponse } from "next";
import { loginHandler } from "@handlers/user/login/login.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const handlers = {
    POST: loginHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method, false)(req, res);
};
