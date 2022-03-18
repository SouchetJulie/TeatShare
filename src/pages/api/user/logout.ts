import { NextApiRequest, NextApiResponse } from "next";
import { logoutHandler } from "@handlers/user/logout/logout.handler";
import routerMiddleware from "@middlewares/router.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    POST: logoutHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
