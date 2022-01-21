import { NextApiRequest, NextApiResponse } from "next";
import { notImplementedHandler } from "@common/not-implemented.handler";
import { userGetOneHandler } from "@handlers/user/get.handler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query as { _id: string };
  const handlers = {
    GET: userGetOneHandler(_id),
    // add here handlers for other methods
  };

  const handler = handlers[req.method] || notImplementedHandler;
  await handler(req, res);
};
