import { bookmarkAddHandler } from "@handlers/lesson/bookmark/add.handler";
import { bookmarkDeleteHandler } from "@handlers/lesson/bookmark/delete.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = req.query as { _id: string };
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    POST: bookmarkAddHandler(_id),
    DELETE: bookmarkDeleteHandler(_id),
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
