import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { bookmarkAddHandler } from "@handlers/lesson/bookmark/add.handler";
import { lessonGetOneHandler } from "@handlers/lesson/get.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { bookmarkDeleteHandler } from "@handlers/lesson/bookmark/delete.handler";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query as { _id: string };
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    GET: lessonGetOneHandler(_id),
    POST: bookmarkAddHandler(_id),
    DELETE: bookmarkDeleteHandler(_id),
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
