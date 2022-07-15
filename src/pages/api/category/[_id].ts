import { categoryGetOneHandler } from "@handlers/category/get.handler";
import routerMiddleware from "@middlewares/router.middleware";
import { ApiResponse } from "@typing/api-response.interface";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true, // for `connect` middlewares
  },
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  const { _id } = req.query as { _id: string };
  const handlers: Record<string, NextApiHandler<ApiResponse>> = {
    GET: categoryGetOneHandler(_id),
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
