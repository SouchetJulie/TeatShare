import { NextApiRequest, NextApiResponse } from "next";
import { notImplementedHandler } from "@common/not-implemented.handler";
import { logoutHandler } from "@handlers/user/logout/logout.handler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const handlers = {
    POST: logoutHandler,
    // add here handlers for other methods
  };

  const handler = handlers[req.method] || notImplementedHandler;

  await handler(req, res);
};
