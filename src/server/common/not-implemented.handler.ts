import { ApiResponse } from "@typing/api-response.interface";
import { NextApiRequest, NextApiResponse } from "next";

export const notImplementedHandler = (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  return res.status(501).send({
    success: false,
    error: "Not implemented",
  });
};
