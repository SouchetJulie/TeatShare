import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { userGetOneHandler } from "@handlers/user/get.handler";
import routerMiddleware from "@middlewares/router.middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query as { _id: string };
  const handlers: Record<string, NextApiHandler> = {
    GET: userGetOneHandler(_id),
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
