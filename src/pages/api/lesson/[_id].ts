import { NextApiRequest, NextApiResponse } from "next";
import { notImplementedHandler } from "@common/not-implemented.handler";
import { lessonGetOneHandler } from "@handlers/lesson/get.handler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query as { _id: string };
  const handlers = {
    GET: lessonGetOneHandler(_id),
    // add here handlers for other methods
  };

  // @ts-ignore
  const handler = handlers[req.method] || notImplementedHandler;

  await handler(req, res);
};
