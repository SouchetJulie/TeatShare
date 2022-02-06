import {NextApiRequest, NextApiResponse} from "next";
import {lessonGetOneHandler} from "@handlers/lesson/get.handler";
import routerMiddleware from "@middlewares/router.middleware";
import {ApiResponse} from "@typing/api-response.interface";

export default async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  const {_id} = req.query as { _id: string };
  const handlers = {
    GET: lessonGetOneHandler(_id),
    // add here handlers for other methods
  };

  await routerMiddleware(handlers, req.method)(req, res);
};
