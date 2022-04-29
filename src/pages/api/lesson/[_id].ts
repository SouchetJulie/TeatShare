import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { lessonGetOneHandler } from "@handlers/lesson/get.handler";
import routerMiddleware from "@middlewares/router.middleware";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query as { _id: string };
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    GET: lessonGetOneHandler(_id),
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
