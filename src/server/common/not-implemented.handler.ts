import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@typing/api-response.interface";

export const notImplementedHandler = (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) =>
  res.status(501).send({
    success: false,
    error: "Not implemented",
  });
