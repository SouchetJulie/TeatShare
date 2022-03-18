import { NextApiRequest, NextApiResponse } from "next";
import { userGetAllHandler } from "@handlers/user/get.handler";
import routerMiddleware from "@middlewares/router.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    GET: userGetAllHandler,
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
