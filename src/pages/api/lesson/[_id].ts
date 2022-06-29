import { lessonGetOneHandler } from "@handlers/lesson/get.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

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
