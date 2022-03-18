import { NextApiRequest, NextApiResponse } from "next";

export const notImplementedHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => res.status(501).send("Not implemented");
